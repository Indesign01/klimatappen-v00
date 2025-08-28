'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui/Card';
import type {
  ProcessedCO2Data,
  ProcessedTemperatureData,
  ProcessedGlacierData,
  ProcessedSeaLevelData
} from '@/types/climate';

// Enhanced CO2 Emissions Chart
interface EnhancedCO2ChartProps {
  data: ProcessedCO2Data[];
  showPerCapita?: boolean;
  showGasFlaring?: boolean;
}

export function EnhancedCO2Chart({ data, showPerCapita = true, showGasFlaring = false }: EnhancedCO2ChartProps) {
  const formatTooltip = (value: number, name: string) => {
    switch (name) {
      case 'total':
        return [`${value.toLocaleString()} Mt CO₂`, 'Totala utsläpp'];
      case 'perCapita':
        return [`${value} ton CO₂`, 'Per capita'];
      case 'gasFlaring':
        return [`${value.toLocaleString()} Mt CO₂`, 'Gas flaring'];
      default:
        return [value, name];
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">CO₂-utsläpp från fossila bränslen</h3>
        <p className="text-sm text-gray-600">Miljoner ton CO₂ per år (1751-2014)</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            stroke="#3B82F6"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          {showPerCapita && (
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#10B981"
              tick={{ fontSize: 12 }}
            />
          )}
          <Tooltip
            formatter={formatTooltip}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={false}
            name="Totala utsläpp"
          />

          {showPerCapita && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="perCapita"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              name="Per capita"
            />
          )}

          {showGasFlaring && (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="gasFlaring"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              name="Gas flaring"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// Enhanced Temperature Chart
interface EnhancedTemperatureChartProps {
  data: ProcessedTemperatureData[];
}

export function EnhancedTemperatureChart({ data }: EnhancedTemperatureChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Global temperaturavvikelse</h3>
        <p className="text-sm text-gray-600">Avvikelse från basperiod (°C)</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#EF4444"
            tick={{ fontSize: 12 }}
            domain={['dataMin - 0.2', 'dataMax + 0.2']}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(2)}°C`, 'Temperaturavvikelse']}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />

          <Line
            type="monotone"
            dataKey="mean"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ fill: '#EF4444', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, stroke: '#EF4444', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// Glacier Mass Balance Chart
interface GlacierChartProps {
  data: ProcessedGlacierData[];
}

export function GlacierChart({ data }: GlacierChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Glaciärernas massbalans</h3>
        <p className="text-sm text-gray-600">Kumulativ förändring i vattenkvivalent (mm)</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#06B6D4"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${value} mm`, 'Massbalans']}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />

          <Line
            type="monotone"
            dataKey="massBalance"
            stroke="#06B6D4"
            strokeWidth={2}
            dot={false}
            fill="url(#glacierGradient)"
          />

          <defs>
            <linearGradient id="glacierGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

// Sea Level Chart
interface SeaLevelChartProps {
  data: ProcessedSeaLevelData[];
}

export function SeaLevelChart({ data }: SeaLevelChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Global havsnivå</h3>
        <p className="text-sm text-gray-600">Relativ förändring (mm)</p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            stroke="#666"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#8B5CF6"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)} mm`, 'GMSL']}
            labelStyle={{ color: '#374151' }}
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />

          <Line
            type="monotone"
            dataKey="gmsl"
            stroke="#8B5CF6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}