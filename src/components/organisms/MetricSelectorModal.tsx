'use client';

import { useState, useEffect } from 'react';
import { AddCustomMetricModal } from '@/components/organisms/AddCustomMetricModal';
import { CustomMetric } from '@/types/custom-metrics';

interface MetricSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMetrics: string[];
  onSave: (metrics: string[]) => void;
  clientId?: string;
}

// Mock metric categories and options
const METRIC_CATEGORIES = {
  audience: {
    title: '👥 Audience',
    metrics: [
      { id: 'users', name: 'Users', description: 'Total number of users' },
      { id: 'newUsers', name: 'New Users', description: 'First-time visitors' },
      { id: 'sessions', name: 'Sessions', description: 'Total sessions' },
      { id: 'engagedSessions', name: 'Engaged Sessions', description: 'Sessions with engagement' },
      { id: 'engagementRate', name: 'Engagement Rate', description: '% of engaged sessions' },
      { id: 'sessionsPerUser', name: 'Sessions per User', description: 'Avg sessions per user' }
    ]
  },
  engagement: {
    title: '🎯 Engagement',
    metrics: [
      { id: 'bounceRate', name: 'Bounce Rate', description: '% of single-page sessions' },
      { id: 'pagesPerSession', name: 'Pages per Session', description: 'Avg pages viewed' },
      { id: 'avgSessionDuration', name: 'Avg Session Duration', description: 'Time on site' },
      { id: 'eventCount', name: 'Event Count', description: 'Total events triggered' },
      { id: 'scrollDepth', name: 'Scroll Depth', description: 'How far users scroll' }
    ]
  },
  conversions: {
    title: '💰 Conversions',
    metrics: [
      { id: 'conversions', name: 'Conversions', description: 'Total conversions' },
      { id: 'conversionRate', name: 'Conversion Rate', description: '% of converting sessions' },
      { id: 'revenue', name: 'Revenue', description: 'Total revenue (if e-commerce)' },
      { id: 'ecommercePurchases', name: 'E-commerce Purchases', description: 'Purchase events' },
      { id: 'transactions', name: 'Transactions', description: 'Completed transactions' }
    ]
  },
  traffic: {
    title: '📍 Traffic Sources',
    metrics: [
      { id: 'organicTraffic', name: 'Organic Traffic %', description: 'Traffic from search' },
      { id: 'directTraffic', name: 'Direct Traffic', description: 'Direct visits' },
      { id: 'referralTraffic', name: 'Referral Traffic', description: 'Traffic from other sites' },
      { id: 'socialTraffic', name: 'Social Traffic', description: 'Traffic from social media' },
      { id: 'paidTraffic', name: 'Paid Traffic', description: 'Traffic from ads' }
    ]
  },
  behavior: {
    title: '📱 Behavior',
    metrics: [
      { id: 'deviceBreakdown', name: 'Device Breakdown', description: 'Desktop/Mobile/Tablet' },
      { id: 'topLandingPages', name: 'Top Landing Pages', description: 'Most visited entry pages' },
      { id: 'topExitPages', name: 'Top Exit Pages', description: 'Most common exit points' },
      { id: 'screenPageViews', name: 'Page Views', description: 'Total page views' }
    ]
  }
};

export default function MetricSelectorModal({
  isOpen,
  onClose,
  selectedMetrics,
  onSave,
  clientId
}: MetricSelectorModalProps) {
  const [localSelection, setLocalSelection] = useState<string[]>(selectedMetrics);
  
  // Custom metrics state
  const [customMetrics, setCustomMetrics] = useState<CustomMetric[]>([]);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [isLoadingCustom, setIsLoadingCustom] = useState(false);

  const MAX_METRICS = 15;

  // Load custom metrics when modal opens
  useEffect(() => {
    async function loadCustomMetrics() {
      if (!clientId || !isOpen) return;
      
      setIsLoadingCustom(true);
      try {
        const response = await fetch(`/api/clients/${clientId}/custom-metrics`);
        const data = await response.json();
        
        if (data.success && Array.isArray(data.metrics)) {
          setCustomMetrics(data.metrics);
        }
      } catch (error) {
        console.error('Failed to load custom metrics:', error);
      } finally {
        setIsLoadingCustom(false);
      }
    }
    
    loadCustomMetrics();
  }, [clientId, isOpen]);

  const toggleMetric = (metricId: string) => {
    if (localSelection.includes(metricId)) {
      setLocalSelection(localSelection.filter(id => id !== metricId));
    } else if (localSelection.length < MAX_METRICS) {
      setLocalSelection([...localSelection, metricId]);
    }
  };

  const handleSave = () => {
    onSave(localSelection);
    onClose();
  };

  const handleReset = () => {
    // Default to executive summary metrics
    setLocalSelection(['users', 'sessions', 'bounceRate', 'conversions']);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Select Metrics</h2>
              <p className="text-sm text-gray-600 mt-1">
                Choose up to {MAX_METRICS} metrics for your custom report
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Counter */}
          <div className="mt-4 flex items-center gap-3">
            <div className={`text-sm font-semibold ${
              localSelection.length >= MAX_METRICS ? 'text-red-600' : 'text-primary-themed'
            }`}>
              Selected: {localSelection.length} / {MAX_METRICS}
              {customMetrics.length > 0 && (
                <span className="ml-2 text-xs text-gray-500 font-normal">
                  ({customMetrics.filter(m => localSelection.includes(m.id)).length} custom)
                </span>
              )}
            </div>
            {localSelection.length >= MAX_METRICS && (
              <div className="text-xs text-red-600">
                Maximum metrics reached
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {Object.entries(METRIC_CATEGORIES).map(([key, category]) => (
              <div key={key}>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.metrics.map((metric) => {
                    const isSelected = localSelection.includes(metric.id);
                    const isDisabled = !isSelected && localSelection.length >= MAX_METRICS;

                    return (
                      <label
                        key={metric.id}
                        className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary-themed bg-primary-themed-light'
                            : isDisabled
                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-primary-themed'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => !isDisabled && toggleMetric(metric.id)}
                          disabled={isDisabled}
                          className="mt-1 w-4 h-4 text-primary-themed"
                        />
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 text-sm">
                            {metric.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {metric.description}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Custom Metrics Section */}
            {clientId && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚙️</span>
                    <h3 className="text-lg font-semibold text-gray-900">Custom Metrics</h3>
                    <span className="text-xs text-gray-500 ml-2">
                      (Your GA4 custom metrics)
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAddCustomModal(true)}
                    className="text-sm font-medium text-primary-themed hover:text-primary-themed-dark transition"
                  >
                    + Add Custom Metric
                  </button>
                </div>
                
                {isLoadingCustom ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin h-6 w-6 border-2 border-primary-themed border-t-transparent rounded-full"></div>
                    <p className="text-sm text-gray-500 mt-2">Loading custom metrics...</p>
                  </div>
                ) : customMetrics.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-600 mb-2">No custom metrics yet</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Add GA4 custom metrics to track in your reports
                    </p>
                    <button
                      onClick={() => setShowAddCustomModal(true)}
                      className="px-4 py-2 bg-primary-themed text-white text-sm rounded-lg hover:bg-primary-themed-dark transition"
                    >
                      Add Your First Custom Metric
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {customMetrics.map((metric) => {
                      const isSelected = localSelection.includes(metric.id);
                      const isDisabled = !isSelected && localSelection.length >= MAX_METRICS;

                      return (
                        <label
                          key={metric.id}
                          className={`flex items-start p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary-themed bg-primary-themed-light'
                              : isDisabled
                              ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                              : 'border-gray-200 hover:border-primary-themed'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => !isDisabled && toggleMetric(metric.id)}
                            disabled={isDisabled}
                            className="mt-1 w-4 h-4 text-primary-themed"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center gap-2">
                              <div className="font-medium text-gray-900 text-sm">
                                {metric.displayName}
                              </div>
                              <span className="text-xs px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded font-normal">
                                Custom
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 font-mono">
                              {metric.apiName}
                            </p>
                          </div>
                          {isSelected && (
                            <svg className="w-5 h-5 text-primary-themed flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Reset to Default
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={localSelection.length === 0}
              className="px-6 py-2 btn-primary-themed disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>

      {/* Add Custom Metric Modal */}
      {showAddCustomModal && clientId && (
        <AddCustomMetricModal
          clientId={clientId}
          onSave={(newMetric) => {
            // Add to local state
            setCustomMetrics([...customMetrics, newMetric]);
            // Close modal
            setShowAddCustomModal(false);
          }}
          onCancel={() => setShowAddCustomModal(false)}
        />
      )}
    </div>
  );
}