//First approach
/*
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const temperatureData = [
      { year: 2020, source: 'GISTEMP', mean: 1.02 },
      { year: 2021, source: 'GISTEMP', mean: 0.85 },
      { year: 2022, source: 'GISTEMP', mean: 0.89 },
    ]

    return NextResponse.json(temperatureData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch temperature data' }, { status: 500 })
  }
}*/

//Current
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/constants';
import { ClimateDataProcessor } from '@/lib/climateDataProcessor';

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINTS.TEMPERATURE, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const processedData = ClimateDataProcessor.processTemperatureData(rawData);

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Failed to fetch temperature data:', error);

    const fallbackData = [
      { year: 2020, source: 'GISTEMP', mean: 1.02 },
      { year: 2021, source: 'GISTEMP', mean: 0.85 },
      { year: 2022, source: 'GISTEMP', mean: 0.89 },
    ];

    return NextResponse.json(fallbackData);
  }
}