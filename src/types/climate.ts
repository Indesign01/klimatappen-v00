export interface ClimateDataPoint {
    year: number;
    value: number;
  }

  export interface CO2EmissionsData {
    year: number;
    total: number;
    gasFuel: number;
    liquidFuel: number;
    solidFuel: number;
    cement: number;
    gasFlaring: number;
    perCapita: number;
  }

  export interface TemperatureData {
    source: string;
    year: number;
    mean: number;
  }

  export interface GlacierData {
    year: number;
    meanCumulativeMassBalance: number;
    numberOfObservations: number;
  }

  export interface SeaLevelData {
    time: string; // Format: YYYY-MM
    gmsl: number;
  }

//Try new appraoch
  // Processed data for charts
  export interface ProcessedCO2Data {
    year: number;
    total: number;
    gasFlaring: number;
    perCapita: number;
  }

  export interface ProcessedTemperatureData {
    year: number;
    source: string;
    mean: number;
  }

  export interface ProcessedGlacierData {
    year: number;
    massBalance: number;
    observations: number;
  }

  export interface ProcessedSeaLevelData {
    time: string;
    year: number;
    gmsl: number;
  }