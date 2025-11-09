/**
 * Custom Metric Type Definitions
 * 
 * These types define the structure for user-defined GA4 custom metrics
 * that can be added to Custom Reports alongside predefined metrics.
 */

/**
 * CustomMetric - The complete custom metric object stored in the database
 * and used throughout the application
 */
export interface CustomMetric {
  id: string;              // Unique identifier: "custom_1", "custom_2", etc.
  apiName: string;         // GA4 API metric name: e.g., "customEvent:newsletter_signup"
  displayName: string;     // User-friendly name: e.g., "Newsletter Signups"
  category: 'custom';      // Always 'custom' to distinguish from predefined metrics
  format: 'number';        // Default format (Phase 1 only supports 'number')
  isCustom: true;          // Flag to easily identify custom metrics
}

/**
 * CustomMetricInput - Simplified input type for creating new custom metrics
 * Used in forms and API requests
 */
export interface CustomMetricInput {
  apiName: string;         // The GA4 metric API name
  displayName: string;     // The display name for reports
}

/**
 * Type guard to check if a metric is a custom metric
 */
export function isCustomMetric(metric: any): metric is CustomMetric {
  return (
    typeof metric === 'object' &&
    metric !== null &&
    'isCustom' in metric &&
    metric.isCustom === true
  );
}