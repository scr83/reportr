import React from 'react';
import { Document } from '@react-pdf/renderer';
import { ReportData } from '../types';
import { CoverPage } from './CoverPage';
import { ExecutiveGA4Page } from './ExecutiveGA4Page';
import { StandardGA4Pages } from './StandardGA4Pages';
import { CustomGA4Pages } from './CustomGA4Pages';
import { RecommendationsPage } from './RecommendationsPage';
import { KeyInsightsPage } from './KeyInsightsPage';
import { StrategicRecommendationsPage } from './StrategicRecommendationsPage';

interface ReportDocumentProps {
  data: ReportData;
}

export const ReportDocument: React.FC<ReportDocumentProps> = ({ data }) => {
  // Document metadata
  const documentTitle = `${data.clientName} SEO Report - ${data.reportType}`;
  const documentAuthor = data.branding.companyName;
  const documentSubject = `SEO Performance Report for ${data.clientName}`;
  const documentCreator = 'SEO Report Generator';

  return (
    <Document
      title={documentTitle}
      author={documentAuthor}
      subject={documentSubject}
      creator={documentCreator}
      keywords={`SEO, report, ${data.clientName}, ${data.branding.companyName}, analytics`}
      language="en"
    >
      {/* Cover Page - Always included */}
      <CoverPage data={data} />

      {/* GSC Metrics Page - Always included (4 metrics) */}
      <GSCMetricsPage data={data} />

      {/* GA4 Pages - Conditional based on report type */}
      {data.reportType === 'executive' && (
        <ExecutiveGA4Page data={data} />
      )}

      {data.reportType === 'standard' && (
        <StandardGA4Pages data={data} />
      )}

      {data.reportType === 'custom' && (
        <CustomGA4Pages data={data} />
      )}

      {/* Key Insights Page - Always included after GA4 data */}
      <KeyInsightsPage data={data} />

      {/* Strategic Recommendations Page - Always included */}
      <StrategicRecommendationsPage data={data} />

      {/* Original Recommendations Page - Include if we have specific insights or recommendations */}
      {(data.insights || data.recommendations) && (
        <RecommendationsPage data={data} />
      )}
    </Document>
  );
};