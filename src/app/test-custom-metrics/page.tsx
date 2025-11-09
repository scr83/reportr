'use client';

import { useState } from 'react';
import { AddCustomMetricModal } from '@/components/organisms/AddCustomMetricModal';

export default function TestCustomMetricsPage() {
  const [showModal, setShowModal] = useState(false);
  const [savedMetrics, setSavedMetrics] = useState<any[]>([]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Test Custom Metrics Modal
        </h1>
        <p className="text-gray-600 mb-6">
          This is a test page to verify the AddCustomMetricModal component.
          This page will NOT be accessible in production.
        </p>
        
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700"
        >
          Open Add Metric Modal
        </button>
        
        {savedMetrics.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg border">
            <h2 className="font-semibold mb-2">Saved Metrics:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(savedMetrics, null, 2)}
            </pre>
          </div>
        )}
        
        {showModal && (
          <AddCustomMetricModal
            clientId="test-client-id"
            onSave={(metric) => {
              console.log('Metric saved:', metric);
              setSavedMetrics([...savedMetrics, metric]);
              setShowModal(false);
            }}
            onCancel={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}