'use client';

import { useState } from 'react';
import { CustomMetric } from '@/types/custom-metrics';

interface AddCustomMetricModalProps {
  clientId: string;
  onSave: (metric: CustomMetric) => void;
  onCancel: () => void;
}

/**
 * Modal for adding a single custom GA4 metric
 * 
 * Users enter:
 * - Display Name: How metric appears in reports
 * - API Name: The exact GA4 metric API name
 * 
 * Phase 1: Manual entry only (no validation against GA4)
 */
export function AddCustomMetricModal({ 
  clientId, 
  onSave, 
  onCancel 
}: AddCustomMetricModalProps) {
  const [apiName, setApiName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function handleSave() {
    // Basic validation
    if (!apiName.trim() || !displayName.trim()) {
      setError('Both fields are required');
      return;
    }
    
    setIsSaving(true);
    setError(null);
    
    try {
      // Create new custom metric object
      const newMetric: CustomMetric = {
        id: `custom_${Date.now()}`,
        apiName: apiName.trim(),
        displayName: displayName.trim(),
        category: 'custom',
        format: 'number',
        isCustom: true
      };
      
      // Save to API
      const response = await fetch(
        `/api/clients/${clientId}/custom-metrics`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            customMetrics: [newMetric]
          })
        }
      );
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save metric');
      }
      
      // Success - notify parent
      onSave(newMetric);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving metric. Please try again.');
      console.error('Save custom metric error:', err);
    } finally {
      setIsSaving(false);
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 mx-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Add Custom Metric
        </h2>
        
        <div className="space-y-4">
          {/* Display Name Input */}
          <div>
            <label 
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Newsletter Signups"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              How this metric will appear in your reports
            </p>
          </div>
          
          {/* GA4 API Name Input */}
          <div>
            <label 
              htmlFor="apiName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              GA4 Metric API Name
            </label>
            <input
              id="apiName"
              type="text"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              placeholder="e.g., customEvent:newsletter_signup"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition"
              disabled={isSaving}
            />
            <p className="text-xs text-gray-500 mt-1">
              The exact metric name from your GA4 property
            </p>
          </div>
          
          {/* Help Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900 font-medium mb-2">
              💡 How to find your GA4 metric names:
            </p>
            <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
              <li>Go to your GA4 property</li>
              <li>Navigate to <strong>Admin → Custom definitions</strong></li>
              <li>Find your custom metric</li>
              <li>Copy the API name (e.g., &quot;customEvent:newsletter_signup&quot;)</li>
            </ol>
            <a
              href="https://support.google.com/analytics/answer/10075209"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
            >
              Learn more about GA4 custom metrics →
            </a>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-900">{error}</p>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSaving || !apiName.trim() || !displayName.trim()}
          >
            {isSaving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none" 
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                  />
                </svg>
                Saving...
              </span>
            ) : (
              'Add Metric'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}