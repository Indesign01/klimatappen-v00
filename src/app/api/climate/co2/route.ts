//First approach
/*
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Fetch CO2 data from external API or database
    const co2Data = [
      { year: 2020, total: 36700, gasFlaring: 280, perCapita: 4.8 },
      { year: 2021, total: 37100, gasFlaring: 290, perCapita: 4.9 },
      { year: 2022, total: 36800, gasFlaring: 275, perCapita: 4.7 },
    ]

    return NextResponse.json(co2Data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch CO2 data' }, { status: 500 })
  }
}*/

//Current
import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/lib/constants';
import { ClimateDataProcessor } from '@/lib/climateDataProcessor';

export async function GET() {
  try {
    const response = await fetch(API_ENDPOINTS.CO2, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();
    const processedData = ClimateDataProcessor.processCO2Data(rawData);

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Failed to fetch CO2 data:', error);

    // Fallback data if external API fails
    const fallbackData = [
      { year: 2020, total: 36700, gasFlaring: 280, perCapita: 4.8 },
      { year: 2021, total: 37100, gasFlaring: 290, perCapita: 4.9 },
      { year: 2022, total: 36800, gasFlaring: 275, perCapita: 4.7 },
    ];

    return NextResponse.json(fallbackData);
  }
}