'use client';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useClimateData } from '@/hooks/useClimateData';
import {
  EnhancedCO2Chart,
  EnhancedTemperatureChart,
  GlacierChart,
  SeaLevelChart
} from '@/components/climate/EnhancedCharts';
import type {
  ProcessedCO2Data,
  ProcessedTemperatureData,
  ProcessedGlacierData,
  ProcessedSeaLevelData
} from '@/types/climate';

const mockStats = {
  completedLessons: 3,
  totalLessons: 12,
  joinedGroups: 2,
  weeklyProgress: 85
};

const recentActivity = [
  { id: 1, type: 'lesson', title: 'Växthuseffekten - Grunderna', time: '2 timmar sedan' },
  { id: 2, type: 'group', title: 'Gick med i Hållbar Energi', time: '1 dag sedan' },
  { id: 3, type: 'lesson', title: 'Klimatförändringar idag', time: '3 dagar sedan' }
];

export default function EnhancedDashboard() {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed'>('overview');

  // Fetch all climate data with error handling and retry
  const { data: co2Data, loading: co2Loading, error: co2Error, lastUpdated: co2Updated } =
    useClimateData<ProcessedCO2Data>('/api/climate/co2', { retryAttempts: 3 });

  const { data: tempData, loading: tempLoading, error: tempError } =
    useClimateData<ProcessedTemperatureData>('/api/climate/temperature', { retryAttempts: 3 });

  const { data: glacierData, loading: glacierLoading, error: glacierError } =
    useClimateData<ProcessedGlacierData>('/api/climate/glaciers', { retryAttempts: 3 });

  const { data: seaLevelData, loading: seaLevelLoading, error: seaLevelError } =
    useClimateData<ProcessedSeaLevelData>('/api/climate/sealevel', { retryAttempts: 3 });

  const isAnyLoading = co2Loading || tempLoading || glacierLoading || seaLevelLoading;
  const hasAnyError = co2Error || tempError || glacierError || seaLevelError;

  // Calculate some basic stats from real data
  const getClimateStats = () => {
    if (!co2Data.length || !tempData.length) return null;

    const latestCO2 = co2Data[co2Data.length - 1];
    const latestTemp = tempData[tempData.length - 1];
    const co2Trend = co2Data.length > 1 ?
      ((latestCO2.total - co2Data[co2Data.length - 2].total) / co2Data[co2Data.length - 2].total * 100) : 0;

    return {
      currentCO2: latestCO2.total,
      currentTemp: latestTemp.mean,
      co2Trend,
      dataPoints: co2Data.length
    };
  };

  const climateStats = getClimateStats();

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Hej {auth.user?.name || 'Användare'}! 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Här är din klimatresa så här långt - med aktuell data från klimatforskning
        </p>
        {co2Updated && (
          <p className="text-sm text-gray-500 mt-1">
            Senast uppdaterad: {co2Updated.toLocaleDateString('sv-SE')} {co2Updated.toLocaleTimeString('sv-SE')}
          </p>
        )}
      </div>

      {/* Error Alert */}
      {hasAnyError && (
        <Card className="p-4 bg-yellow-50 border border-yellow-200">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">⚠️</span>
            <div>
              <h3 className="font-medium text-yellow-800">Vissa klimatdata kunde inte laddas</h3>
              <p className="text-sm text-yellow-700">
                Fallback-data visas. Prova att uppdatera sidan eller kontrollera internetanslutningen.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Stats Grid with Real Climate Data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl font-bold text-blue-600">{mockStats.completedLessons}</div>
          <div className="text-gray-600 mt-1">Avklarade lektioner</div>
          <div className="text-sm text-gray-500">av {mockStats.totalLessons}</div>
        </Card>

        <Card className="text-center">
          {climateStats ? (
            <>
              <div className="text-3xl font-bold text-red-600">
                {climateStats.currentCO2.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-1">Mt CO₂</div>
              <div className="text-sm text-gray-500">senaste år</div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-400">---</div>
              <div className="text-gray-600 mt-1">Laddar...</div>
            </>
          )}
        </Card>

        <Card className="text-center">
          {climateStats ? (
            <>
              <div className="text-3xl font-bold text-orange-600">
                +{climateStats.currentTemp.toFixed(1)}°C
              </div>
              <div className="text-gray-600 mt-1">Temp. avvikelse</div>
              <div className="text-sm text-gray-500">från basperiod</div>
            </>
          ) : (
            <>
              <div className="text-3xl font-bold text-gray-400">---</div>
              <div className="text-gray-600 mt-1">Laddar...</div>
            </>
          )}
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-green-600">
            {climateStats?.dataPoints || '---'}
          </div>
          <div className="text-gray-600 mt-1">Datapunkter</div>
          <div className="text-sm text-gray-500">i visualisering</div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <Button
          onClick={() => setActiveTab('overview')}
          variant={activeTab === 'overview' ? 'primary' : 'secondary'}
        >
          Översikt
        </Button>
        <Button
          onClick={() => setActiveTab('detailed')}
          variant={activeTab === 'detailed' ? 'primary' : 'secondary'}
        >
          Detaljerad Data
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Main Climate Data Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              {co2Loading ? (
                <Card className="p-6 flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </Card>
              ) : (
                <EnhancedCO2Chart data={co2Data} showPerCapita={true} />
              )}
            </div>

            <div>
              {tempLoading ? (
                <Card className="p-6 flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                </Card>
              ) : (
                <EnhancedTemperatureChart data={tempData} />
              )}
            </div>
          </div>

          {/* Activity and Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold mb-4">Senaste aktivitet</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                      <div className="text-2xl">
                        {activity.type === 'lesson' ? '📖' : '👥'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recommendations */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-4">Rekommenderat</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900">Nästa lektion</h3>
                    <p className="text-sm text-blue-700">Förnybar energi</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-900">Klimatdata</h3>
                    <p className="text-sm text-green-700">
                      {climateStats?.dataPoints || '---'} historiska datapunkter
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-medium text-purple-900">Trend</h3>
                    <p className="text-sm text-purple-700">
                      {climateStats ?
                        `CO₂: ${climateStats.co2Trend > 0 ? '+' : ''}${climateStats.co2Trend.toFixed(1)}%`
                        : 'Laddar...'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {activeTab === 'detailed' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div>
              {glacierLoading ? (
                <Card className="p-6 flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                </Card>
              ) : (
                <GlacierChart data={glacierData} />
              )}
            </div>

            <div>
              {seaLevelLoading ? (
                <Card className="p-6 flex justify-center items-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </Card>
              ) : (
                <SeaLevelChart data={seaLevelData} />
              )}
            </div>
          </div>

          {/* Full width detailed CO2 chart */}
          <div>
            {co2Loading ? (
              <Card className="p-6 flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </Card>
            ) : (
              <EnhancedCO2Chart
                data={co2Data}
                showPerCapita={true}
                showGasFlaring={true}
              />
            )}
          </div>
        </div>
      )}

      {/* Data Quality Notice */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-start space-x-2">
          <span className="text-blue-600">ℹ️</span>
          <div>
            <h3 className="font-medium text-blue-800">Om klimatdata</h3>
            <p className="text-sm text-blue-700 mt-1">
              Data hämtas från etablerade klimatforskning och samplats för optimal visualisering.
              CO₂-data kommer från Global Carbon Atlas, temperaturdata från GISTEMP/GCAG,
              glaciärdata från WGMS, och havsnivådata från NASA/NOAA.
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Data uppdateras automatiskt och cacheas för bättre prestanda.
              {climateStats && (
                <span> Visar för närvarande {climateStats.dataPoints} samplade datapunkter.</span>
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}