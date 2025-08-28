import { DATA_CONFIG } from './constants';
import type {
  CO2EmissionsData,
  TemperatureData,
  GlacierData,
  SeaLevelData,
  ProcessedCO2Data,
  ProcessedTemperatureData,
  ProcessedGlacierData,
  ProcessedSeaLevelData,
} from '@/types/climate';

export class ClimateDataProcessor {
  static processCO2Data(rawData: CO2EmissionsData[]): ProcessedCO2Data[] {
    // Sort by year and filter for sampling
    const sortedData = rawData.sort((a, b) => a.Year - b.Year);

    // Sample data based on interval, but always include recent years
    const currentYear = new Date().getFullYear();
    const recentYearThreshold = currentYear - DATA_CONFIG.RECENT_YEARS_COUNT;

    return sortedData
      .filter((item, index) => {
        // Include recent years
        if (item.Year >= recentYearThreshold) return true;
        // Include data at specified intervals
        return index % DATA_CONFIG.YEAR_INTERVAL === 0;
      })
      .map(item => ({
        year: item.Year,
        total: item.Total,
        gasFlaring: item['Gas Flaring'],
        perCapita: item['Per Capita'],
      }));
  }

  static processTemperatureData(rawData: TemperatureData[]): ProcessedTemperatureData[] {
    // Filter for GISTEMP data and sample
    const gistempData = rawData
      .filter(item => item.Source === 'GISTEMP')
      .sort((a, b) => a.Year - b.Year);

    const currentYear = new Date().getFullYear();
    const recentYearThreshold = currentYear - DATA_CONFIG.RECENT_YEARS_COUNT;

    return gistempData
      .filter((item, index) => {
        // Include recent years
        if (item.Year >= recentYearThreshold) return true;
        // Include data at specified intervals
        return index % DATA_CONFIG.TEMP_YEAR_INTERVAL === 0;
      })
      .map(item => ({
        year: item.Year,
        source: item.Source,
        mean: item.Mean,
      }));
  }

  static processGlacierData(rawData: GlacierData[]): ProcessedGlacierData[] {
    // Sort and sample glacier data
    const sortedData = rawData.sort((a, b) => a.Year - b.Year);

    const currentYear = new Date().getFullYear();
    const recentYearThreshold = currentYear - DATA_CONFIG.RECENT_YEARS_COUNT;

    return sortedData
      .filter((item, index) => {
        if (item.Year >= recentYearThreshold) return true;
        return index % DATA_CONFIG.YEAR_INTERVAL === 0;
      })
      .map(item => ({
        year: item.Year,
        massBalance: item['Mean cumulative mass balance'],
        observations: item['Number of observations'],
      }));
  }

  static processSeaLevelData(rawData: SeaLevelData[]): ProcessedSeaLevelData[] {
    // Convert time string to year for easier handling
    return rawData
      .map(item => ({
        time: item.Time,
        year: parseInt(item.Time.split('-')[0]),
        gmsl: item.GMSL,
      }))
      .sort((a, b) => a.year - b.year)
      // Sample every few years to avoid overcrowding
      .filter((item, index) => index % 12 === 0); // Every 12 months (yearly)
  }
}