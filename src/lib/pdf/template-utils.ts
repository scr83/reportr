import { readFileSync } from 'fs';
import { join } from 'path';
import { ReportData } from './types';

export interface TemplateData {
  // Branding
  AGENCY_NAME: string;
  AGENCY_LOGO?: string;
  PRIMARY_COLOR: string;
  
  // Report meta
  CLIENT_NAME: string;
  DATE_RANGE: string;
  REPORT_DATE: string;
  
  // GSC Metrics
  TOTAL_CLICKS: string;
  TOTAL_IMPRESSIONS: string;
  AVERAGE_CTR: string;
  AVERAGE_POSITION: string;
  
  // GA4 Metrics
  TOTAL_USERS: string;
  TOTAL_SESSIONS: string;
  BOUNCE_RATE: string;
  TOTAL_CONVERSIONS: string;
  
  // Summary texts
  SUMMARY_TEXT: string;
  GA4_SUMMARY_TEXT: string;
  
  // Dynamic sections
  TOP_KEYWORDS?: string;
}

export function generateReportHTML(
  reportData: ReportData
): string {
  // Read the template file
  const templatePath = join(process.cwd(), 'src', 'templates', 'report-template.html');
  let template: string;
  
  try {
    template = readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read template file:', error);
    // Fallback to inline template if file read fails
    template = getInlineTemplate();
  }
  
  // Prepare template data
  const templateData = prepareTemplateData(reportData);
  
  // Replace placeholders
  let html = template;
  
  // Replace simple placeholders
  Object.entries(templateData).forEach(([key, value]) => {
    if (value !== undefined && key !== 'TOP_KEYWORDS') {
      const placeholder = `{{${key}}}`;
      html = html.replace(new RegExp(placeholder, 'g'), String(value));
    }
  });
  
  // Handle conditional sections
  html = handleConditionalSections(html, templateData);
  
  // Clean up any remaining placeholders
  html = cleanupPlaceholders(html);
  
  return html;
}

function prepareTemplateData(
  reportData: ReportData
): TemplateData {
  const startDate = formatDate(reportData.reportPeriod.startDate);
  const endDate = formatDate(reportData.reportPeriod.endDate);
  
  return {
    // Branding
    AGENCY_NAME: reportData.branding.companyName || 'SEO Reports',
    AGENCY_LOGO: reportData.branding.logo,
    PRIMARY_COLOR: reportData.branding.primaryColor || '#6366f1',
    
    // Report meta
    CLIENT_NAME: reportData.clientName,
    DATE_RANGE: `${startDate} - ${endDate}`,
    REPORT_DATE: formatDate(new Date()),
    
    // GSC Metrics
    TOTAL_CLICKS: formatNumber(reportData.gscMetrics?.clicks || 0),
    TOTAL_IMPRESSIONS: formatNumber(reportData.gscMetrics?.impressions || 0),
    AVERAGE_CTR: formatPercentage(reportData.gscMetrics?.ctr || 0),
    AVERAGE_POSITION: formatDecimal(reportData.gscMetrics?.position || 0),
    
    // GA4 Metrics
    TOTAL_USERS: formatNumber(reportData.ga4Metrics?.users || 0),
    TOTAL_SESSIONS: formatNumber(reportData.ga4Metrics?.sessions || 0),
    BOUNCE_RATE: formatPercentage(reportData.ga4Metrics?.bounceRate || 0),
    TOTAL_CONVERSIONS: formatNumber(reportData.ga4Metrics?.conversions || 0),
    
    // Summary texts
    SUMMARY_TEXT: generateSummaryText(reportData),
    GA4_SUMMARY_TEXT: generateGA4SummaryText(reportData),
    
    // Dynamic sections
    TOP_KEYWORDS: generateTopKeywordsTable([])
  };
}

function generateSummaryText(reportData: ReportData): string {
  const startDate = formatDate(reportData.reportPeriod.startDate);
  const endDate = formatDate(reportData.reportPeriod.endDate);
  const clicks = reportData.gscMetrics?.clicks || 0;
  const impressions = reportData.gscMetrics?.impressions || 0;
  const position = reportData.gscMetrics?.position || 0;
  const ctr = reportData.gscMetrics?.ctr || 0;
  const users = reportData.ga4Metrics?.users || 0;
  const sessions = reportData.ga4Metrics?.sessions || 0;
  
  return `During ${startDate} to ${endDate}, ${reportData.clientName} received ${formatNumber(clicks)} clicks and ${formatNumber(impressions)} impressions from search results. The average search position was ${formatDecimal(position)} with a click-through rate of ${formatPercentage(ctr)}. Google Analytics tracked ${formatNumber(users)} users with ${formatNumber(sessions)} sessions.`;
}

function generateGA4SummaryText(reportData: ReportData): string {
  const users = reportData.ga4Metrics?.users || 0;
  const sessions = reportData.ga4Metrics?.sessions || 0;
  const bounceRate = reportData.ga4Metrics?.bounceRate || 0;
  const conversions = reportData.ga4Metrics?.conversions || 0;
  
  const engagementQuality = bounceRate < 0.4 ? 'excellent' : bounceRate < 0.6 ? 'good' : 'room for improvement in';
  
  return `Your website engaged ${formatNumber(users)} users across ${formatNumber(sessions)} sessions. The bounce rate of ${formatPercentage(bounceRate)} indicates ${engagementQuality} user engagement. A total of ${formatNumber(conversions)} conversions were recorded during this period.`;
}

function generateTopKeywordsTable(topQueries: any[]): string {
  if (!topQueries || topQueries.length === 0) {
    return '';
  }
  
  return topQueries.slice(0, 10).map((query, index) => `
    <div class="${index % 2 === 0 ? 'table-row' : 'table-row-alt'}">
      <div class="table-cell-wide">${escapeHtml(query.query || '')}</div>
      <div class="table-cell-center">${formatNumber(query.clicks || 0)}</div>
      <div class="table-cell-center">${formatNumber(query.impressions || 0)}</div>
      <div class="table-cell-center">${formatPercentage(query.ctr || 0)}</div>
      <div class="table-cell-center">${formatDecimal(query.position || 0)}</div>
    </div>
  `).join('');
}

function handleConditionalSections(html: string, templateData: TemplateData): string {
  // Handle {{#if AGENCY_LOGO}} sections
  const logoRegex = /{{#if AGENCY_LOGO}}([\s\S]*?){{\/if}}/g;
  html = html.replace(logoRegex, (match, content) => {
    return templateData.AGENCY_LOGO ? content : '';
  });
  
  // Handle {{#if TOP_KEYWORDS}} sections
  const keywordsRegex = /{{#if TOP_KEYWORDS}}([\s\S]*?){{\/if}}/g;
  html = html.replace(keywordsRegex, (match, content) => {
    if (templateData.TOP_KEYWORDS && templateData.TOP_KEYWORDS.trim()) {
      return content.replace('{{TOP_KEYWORDS}}', templateData.TOP_KEYWORDS);
    }
    return '';
  });
  
  return html;
}

function cleanupPlaceholders(html: string): string {
  // Remove any remaining placeholders that weren't replaced
  return html.replace(/{{[^}]*}}/g, '');
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toLocaleString('en-US');
}

function formatPercentage(decimal: number): string {
  const percentage = typeof decimal === 'number' ? decimal * 100 : 0;
  return `${percentage.toFixed(1)}%`;
}

function formatDecimal(num: number, places: number = 1): string {
  return num.toFixed(places);
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Fallback inline template in case file reading fails
function getInlineTemplate(): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SEO Report - {{CLIENT_NAME}}</title>
    <style>
        body { font-family: Helvetica, Arial, sans-serif; margin: 0; padding: 40px; }
        .page { min-height: 297mm; page-break-after: always; }
        .cover { background: {{PRIMARY_COLOR}}; color: white; text-align: center; padding: 100px 40px; }
        .title { font-size: 48px; margin-bottom: 20px; }
        .client { font-size: 36px; color: #22d3ee; margin-bottom: 40px; }
        @media print { body { -webkit-print-color-adjust: exact; } }
    </style>
</head>
<body>
    <div class="page cover">
        <h1 class="title">SEO Performance Report</h1>
        <div class="client">{{CLIENT_NAME}}</div>
        <div>{{DATE_RANGE}}</div>
    </div>
</body>
</html>
  `;
}