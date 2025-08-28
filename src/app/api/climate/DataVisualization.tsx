'use client'
import { useEffect, useState } from 'react'
import ClimateChart from './ClimateChart'

export default function DataVisualization() {
  const [co2Data, setCo2Data] = useState([])
  const [temperatureData, setTemperatureData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClimateData = async () => {
      try {
        const [co2Response, tempResponse] = await Promise.all([
          fetch('/api/climate/co2'),
          fetch('/api/climate/temperature')
        ])

        const co2 = await co2Response.json()
        const temp = await tempResponse.json()

        setCo2Data(co2)
        setTemperatureData(temp)
      } catch (error) {
        console.error('Failed to fetch climate data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchClimateData()
  }, [])

  if (loading) return <div>Laddar klimatdata...</div>

  return <ClimateChart co2Data={co2Data} temperatureData={temperatureData} />
}