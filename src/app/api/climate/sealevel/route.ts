//First approach
/*
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const seaLevelData = [
      { time: '2020-01', gmsl: 95.2 },
      { time: '2021-01', gmsl: 97.8 },
      { time: '2022-01', gmsl: 101.3 },
    ]

    return NextResponse.json(seaLevelData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sea level data' }, { status: 500 })
  }
}*/

//Current
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/constants';
import { ClimateDataProcessor } from '@/lib/climateDataProcessor';

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINTS.SEALEVEL, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const processedData = ClimateDataProcessor.processSeaLevelData(rawData);

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Failed to fetch sea level data:', error);

    const fallbackData = [
      { time: '2020-01', year: 2020, gmsl: 95.2 },
      { time: '2021-01', year: 2021, gmsl: 97.8 },
      { time: '2022-01', year: 2022, gmsl: 101.3 },
    ];

    return NextResponse.json(fallbackData);
  }
}