'use client';

import { useState } from 'react';

interface MetricSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMetrics: string[];
  onSave: (metrics: string[]) => void;
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
  onSave
}: MetricSelectorModalProps) {
  const [localSelection, setLocalSelection] = useState<string[]>(selectedMetrics);

  const MAX_METRICS = 15;

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
              localSelection.length >= MAX_METRICS ? 'text-red-600' : 'text-purple-600'
            }`}>
              Selected: {localSelection.length} / {MAX_METRICS}
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
                            ? 'border-purple-500 bg-purple-50'
                            : isDisabled
                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => !isDisabled && toggleMetric(metric.id)}
                          disabled={isDisabled}
                          className="mt-1 w-4 h-4 text-purple-600"
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
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}