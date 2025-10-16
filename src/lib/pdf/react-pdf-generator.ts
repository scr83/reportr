import * as React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { ReportData, PDFGeneratorResult, ReactPDFGenerationOptions, ReactPDFError } from './types';

/**
 * React-PDF Generator Class
 * 
 * Handles PDF generation using React-PDF library for professional,
 * branded SEO reports. Replaces Puppeteer for better performance
 * and maintainability.
 */
class ReactPDFGenerator {
  private options: ReactPDFGenerationOptions;

  constructor(options: ReactPDFGenerationOptions = {}) {
    this.options = {
      timeout: 30000, // 30 second default timeout
      debug: false,
      compressionLevel: 6, // PDF compression level (0-9)
      ...options,
    };
  }

  /**
   * Generate PDF report from ReportData
   * 
   * @param data - Report data including metrics, branding, and client info
   * @returns Promise<PDFGeneratorResult> - Success status and PDF buffer or error
   */
  async generateReport(data: ReportData): Promise<PDFGeneratorResult> {
    const startTime = Date.now();
    
    try {
      // PHASE 2 DIAGNOSTIC LOGGING: PDF Generator analysis
      console.log('🟣 PDF GENERATOR: Starting generation');
      console.log('Data received:', JSON.stringify(data, null, 2));
      console.log('Validation checks:');
      console.log('  - Has clientName:', !!data.clientName);
      console.log('  - Has branding:', !!data.branding);
      console.log('  - Has reportType:', !!data.reportType);
      console.log('  - GSC data keys:', data.gscMetrics ? Object.keys(data.gscMetrics) : []);
      console.log('  - GA4 data keys:', data.ga4Metrics ? Object.keys(data.ga4Metrics) : []);
      console.log('  - Has insights:', !!data.insights);
      
      // Validate input data
      this.validateReportData(data);
      
      if (this.options.debug) {
        console.log('[ReactPDFGenerator] Starting PDF generation for client:', data.clientName);
      }

      // Import ReportDocument component dynamically to avoid circular dependencies
      const { ReportDocument } = await this.loadReportDocument();
      
      // Create React element with report data
      const documentElement = React.createElement(ReportDocument, { data });
      
      // Generate PDF buffer using React-PDF
      const pdfBuffer = await this.renderWithTimeout(documentElement);
      
      const processingTime = Date.now() - startTime;
      
      if (this.options.debug) {
        console.log(`[ReactPDFGenerator] PDF generated successfully in ${processingTime}ms`);
        console.log(`[ReactPDFGenerator] Buffer size: ${pdfBuffer.length} bytes`);
      }

      return {
        success: true,
        pdfBuffer,
        processingTime,
      };
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      const pdfError = this.createPDFError(error, 'rendering', processingTime);
      
      console.error('[ReactPDFGenerator] PDF generation failed:', pdfError);
      
      return {
        success: false,
        error: pdfError.message,
        processingTime,
      };
    }
  }

  /**
   * Render React-PDF document to buffer with timeout protection
   */
  private async renderWithTimeout(documentElement: React.ReactElement): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`PDF generation timed out after ${this.options.timeout}ms`));
      }, this.options.timeout);

      renderToBuffer(documentElement)
        .then((buffer) => {
          clearTimeout(timeoutId);
          resolve(buffer);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  /**
   * Validate report data before PDF generation
   */
  private validateReportData(data: ReportData): void {
    if (!data) {
      throw new Error('Report data is required');
    }

    if (!data.clientName || data.clientName.trim() === '') {
      throw new Error('Client name is required');
    }

    if (!data.branding) {
      throw new Error('Branding configuration is required');
    }

    if (!data.branding.companyName || data.branding.companyName.trim() === '') {
      throw new Error('Agency name is required in branding configuration');
    }

    if (!data.reportPeriod || !data.reportPeriod.startDate || !data.reportPeriod.endDate) {
      throw new Error('Report date range (reportPeriod with startDate and endDate) is required');
    }

    // Validate date format
    const startDate = new Date(data.reportPeriod.startDate);
    const endDate = new Date(data.reportPeriod.endDate);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      throw new Error('Invalid date format in report date range');
    }

    if (startDate >= endDate) {
      throw new Error('Start date must be before end date');
    }
  }

  /**
   * Dynamically import ReportDocument component
   * This prevents circular dependencies and allows for lazy loading
   */
  private async loadReportDocument(): Promise<{ ReportDocument: React.ComponentType<{ data: ReportData }> }> {
    try {
      // Import the ReportDocument component directly
      const moduleExports = await import('./components/ReportDocument');
      
      if (!moduleExports.ReportDocument) {
        throw new Error('ReportDocument component not exported');
      }
      
      return { ReportDocument: moduleExports.ReportDocument };
    } catch (error) {
      // Expected during Phase 2 - ReportDocument will be created in Phase 3
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes('Cannot resolve module') || 
          errorMessage.includes('Module not found') ||
          errorMessage.includes('Cannot find module') ||
          errorMessage.includes('Failed to fetch dynamically imported module')) {
        throw new Error(
          'ReportDocument component not found. This component will be created in Phase 3 of the migration.'
        );
      }
      
      throw new Error(
        'Failed to load ReportDocument component. ' +
        `Original error: ${errorMessage}`
      );
    }
  }

  /**
   * Create structured error object for better debugging
   */
  private createPDFError(
    error: unknown,
    stage: ReactPDFError['stage'],
    duration: number
  ): ReactPDFError {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    const originalError = error instanceof Error ? error : new Error(String(error));
    
    const pdfError = new Error(
      `PDF generation failed at ${stage}: ${message}`
    ) as ReactPDFError;
    
    pdfError.stage = stage;
    pdfError.duration = duration;
    pdfError.originalError = originalError;
    
    return pdfError;
  }

  /**
   * Update generation options
   */
  updateOptions(newOptions: Partial<ReactPDFGenerationOptions>): void {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Get current options
   */
  getOptions(): ReactPDFGenerationOptions {
    return { ...this.options };
  }
}

// Export singleton instance for consistent usage across the application
export const pdfGenerator = new ReactPDFGenerator({
  timeout: 30000,
  debug: process.env.NODE_ENV === 'development',
  compressionLevel: 6,
});

// Export class for testing and custom instances
export { ReactPDFGenerator };

// Export types for external usage
export type { PDFGeneratorResult, ReactPDFGenerationOptions, ReactPDFError } from './types';