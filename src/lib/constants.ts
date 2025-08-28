export const APP_NAME = 'Klimatappen';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  LESSONS: '/lektioner',
  GROUPS: '/klimatgrupper',
} as const;
//First approach
//export const API_ENDPOINTS = {
//  CO2: 'https://fakehttps://fakehttps://fakeapi.github.io/climate/co2emissions.json',
//  TEMPERATURE: 'https://fakeapi.github.io/climate/temperature.json',
//  GLACIERS: 'https://fakeapi.github.io/climate/glaciers.json',
//  SEALEVEL: 'https://fakeapi.github.io/climate/sealevel.json',
//} as const;

//Current
export const API_ENDPOINTS = {
  CO2: 'https://jek-hb.github.io/climate/co2emissions.json',
  TEMPERATURE: 'https://jek-hb.github.io/climate/temperature.json',
  GLACIERS: 'https://jek-hb.github.io/climate/glaciers.json',
  SEALEVEL: 'https://jek-hb.github.io/climate/sealevel.json',
} as const;

// Data sampling configuration
export const DATA_CONFIG = {
  // Show every N years to reduce chart clutter
  YEAR_INTERVAL: 5,
  // For recent data focus
  RECENT_YEARS_COUNT: 20,
  // For temperature data sampling
  TEMP_YEAR_INTERVAL: 10,
} as const;






export const LESSON_CATEGORIES = [
  'Intro till klimat',
  'Växthuseffekten',
  'Hållbar energi',
  'Klimatförändring'
] as const;