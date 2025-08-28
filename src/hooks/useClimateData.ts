//First approach
/*
'use client';
import { useState, useEffect } from 'react';
import { CO2EmissionsData, TemperatureData, GlacierData, SeaLevelData } from '@/types/climate';

export function useClimateData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}*/

//Current
import { useState, useEffect } from 'react';

interface UseClimateDataOptions {
  refreshInterval?: number;
  retryAttempts?: number;
}

export function useClimateData<T>(
  endpoint: string,
  options: UseClimateDataOptions = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { refreshInterval = 0, retryAttempts = 3 } = options;

  const fetchData = async (attempt = 1): Promise<void> => {
    try {
      setError(null);
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (attempt < retryAttempts) {
        // Retry with exponential backoff
        setTimeout(() => fetchData(attempt + 1), Math.pow(2, attempt) * 1000);
      } else {
        setError(`Failed to fetch data after ${retryAttempts} attempts: ${errorMessage}`);
      }
    } finally {
      if (attempt === 1) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [endpoint, refreshInterval]);

  return { data, loading, error, lastUpdated, refetch: fetchData };
}