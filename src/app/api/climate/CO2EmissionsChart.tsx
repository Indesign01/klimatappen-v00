'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
//import { Card } from '../ui/Card'
import { Card } from '@/components/ui/Card'

interface CO2Data {
  year: number
  total: number
  gasFlaring: number
  perCapita: number
}

interface CO2EmissionsChartProps {
  data: CO2Data[]
}

export default function CO2EmissionsChart({ data }: CO2EmissionsChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">CO2-utsläpp från fossila bränslen</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip formatter={(value, name) => [value, name === 'total' ? 'Totalt' : 'Per capita']} />
          <Line type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={2} />
          <Line type="monotone" dataKey="perCapita" stroke="#10B981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}