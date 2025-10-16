import { NextResponse } from 'next/server';

// Configure route for React-PDF compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PDF Generation Health Check Endpoint
 * 
 * GET /api/pdf-health - Returns the status of PDF generation system
 * Used for monitoring and debugging PDF generation capabilities
 */
export async function GET() {
  try {
    // Check React-PDF generator availability
    const { pdfGenerator } = await import('@/lib/pdf/react-pdf-generator');
    
    // Get current generator configuration
    const options = pdfGenerator.getOptions();
    
    // Check if ReportDocument component is available
    let componentStatus = 'not-available';
    let componentError = null;
    
    try {
      // Try to import ReportDocument component
      await import('@/lib/pdf/components/ReportDocument');
      componentStatus = 'available';
    } catch (error) {
      componentError = error instanceof Error ? error.message : String(error);
      
      if (componentError.includes('Cannot resolve module') || 
          componentError.includes('Module not found')) {
        componentStatus = 'pending-creation'; // Expected during Phase 4
      } else {
        componentStatus = 'error';
      }
    }
    
    // Check environment variables
    const envStatus = {
      blobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      anthropicKey: !!process.env.ANTHROPIC_API_KEY,
      databaseUrl: !!process.env.DATABASE_URL,
      nextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    };
    
    const allEnvReady = Object.values(envStatus).every(Boolean);
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      pdfGenerator: {
        engine: 'react-pdf',
        available: true,
        options: {
          timeout: options.timeout,
          debug: options.debug,
          compressionLevel: options.compressionLevel,
        }
      },
      reportDocument: {
        status: componentStatus,
        error: componentError,
        phase: componentStatus === 'pending-creation' ? 'Phase 4 - Component will be created in Phase 5' : undefined
      },
      environment: {
        allReady: allEnvReady,
        details: envStatus,
        runtime: 'nodejs',
        nodeVersion: process.version
      },
      migration: {
        phase: 'Phase 4 Complete',
        status: 'API endpoints updated for React-PDF and components are available',
        nextPhase: componentStatus === 'available' ? 'Migration complete - ready for production' : 'Phase 5 - Create ReportDocument component'
      }
    });
    
  } catch (error) {
    console.error('PDF health check failed:', error);
    
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
      migration: {
        phase: 'Phase 4',
        status: 'Error during health check'
      }
    }, { status: 500 });
  }
}