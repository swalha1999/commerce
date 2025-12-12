'use client';

import { useEffect, useState } from 'react';

interface DebugInfo {
  success: boolean;
  database?: {
    connected: boolean;
    version: string;
    tableExists: boolean;
    todoCount: number;
  };
  error?: string;
  timestamp: string;
}

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDebugInfo();
  }, []);

  const fetchDebugInfo = async () => {
    try {
      const response = await fetch('/debug/db');
      const data = await response.json();
      setDebugInfo(data);
    } catch (error) {
      setDebugInfo({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch debug info',
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDebugInfo();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Database Debug</h1>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Checking database connection...</p>
            </div>
          ) : debugInfo ? (
            <div className="space-y-4">
              {debugInfo.success ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Database Connection Status</h2>
                    <p className="text-green-700">Successfully connected to database</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Database Version</h3>
                      <p className="text-sm text-gray-600 font-mono">{debugInfo.database?.version}</p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-700 mb-2">Todo Table</h3>
                      <p className="text-sm text-gray-600">
                        {debugInfo.database?.tableExists ? 'Exists' : 'Missing'} - 
                        {debugInfo.database?.todoCount} records
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h2 className="text-lg font-semibold text-red-800 mb-2">❌ Database Connection Failed</h2>
                  <p className="text-red-700">{debugInfo.error}</p>
                </div>
              )}

              <div className="text-xs text-gray-500 pt-4 border-t">
                Last checked: {new Date(debugInfo.timestamp).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No debug information available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}