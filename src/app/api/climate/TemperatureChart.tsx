'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
//import { Card } from '../ui/Card'
import { Card } from '@/components/ui/Card'

interface TemperatureData {
  year: number
  source: string
  mean: number
}

interface TemperatureChartProps {
  data: TemperatureData[]
}

export default function TemperatureChart({ data }: TemperatureChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Global temperaturavvikelse</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value}°C`, 'Temperaturavvikelse']} />
          <Line type="monotone" dataKey="mean" stroke="#EF4444" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}