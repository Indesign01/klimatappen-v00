//First approach
/*
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const glacierData = [
      { year: 2020, massBalance: -340, observations: 42 },
      { year: 2021, massBalance: -280, observations: 38 },
      { year: 2022, massBalance: -420, observations: 45 },
    ]

    return NextResponse.json(glacierData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch glacier data' }, { status: 500 })
  }
}*/

//Current
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/constants';
import { ClimateDataProcessor } from '@/lib/climateDataProcessor';

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINTS.GLACIERS, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const processedData = ClimateDataProcessor.processGlacierData(rawData);

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Failed to fetch glacier data:', error);

    const fallbackData = [
      { year: 2020, massBalance: -340, observations: 42 },
      { year: 2021, massBalance: -280, observations: 38 },
      { year: 2022, massBalance: -420, observations: 45 },
    ];

    return NextResponse.json(fallbackData);
  }
}