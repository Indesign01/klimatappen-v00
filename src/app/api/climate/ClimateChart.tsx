'use client'
//import { Card } from '../ui/Card'
import { Card } from '@/components/ui/Card'
import CO2EmissionsChart from './CO2EmissionsChart'
import TemperatureChart from './TemperatureChart'

interface ClimateChartProps {
  co2Data: any[]
  temperatureData: any[]
}

export default function ClimateChart({ co2Data, temperatureData }: ClimateChartProps) {
  return (
    <div className="space-y-6">
      <CO2EmissionsChart data={co2Data} />
      <TemperatureChart data={temperatureData} />
    </div>
  )
}