-- AddCustomMetricsField
-- Add customMetrics JSON field to Client model for storing GA4 custom metrics

ALTER TABLE "clients" ADD COLUMN "customMetrics" JSONB;