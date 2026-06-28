'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Doula } from '../types/doula';

type DoulaType = 'Birth' | 'Postpartum' | 'Full Spectrum';

export function useDoulas() {
  const [zip, setZip] = useState('');
  const [types, setTypes] = useState<DoulaType[]>([]);
  const [date, setDate] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);
  const [extraFilters, setExtraFilters] = useState<Record<string, boolean>>({});
  const [minBirthFee, setMinBirthFee] = useState(0);
  const [maxBirthFee, setMaxBirthFee] = useState(3000);
  const [minPostpartumRate, setMinPostpartumRate] = useState(0);
  const [maxPostpartumRate, setMaxPostpartumRate] = useState(150);

  const [doulas, setDoulas] = useState<Doula[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const fetchDoulas = useCallback(
    async (
      currentZip: string,
      currentTypes: DoulaType[],
      currentDate: string | null,
      currentDays: string[],
      currentExtraFilters: Record<string, boolean>,
      mbfVal: number,
      xbfVal: number,
      mprVal: number,
      xprVal: number
    ) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (currentZip.trim()) params.append('zip', currentZip.trim());
        if (currentTypes.length > 0) params.append('types', currentTypes.join(','));
        if (currentDate) params.append('date', currentDate);
        if (currentDays.length > 0) params.append('days', currentDays.join(','));
        params.append('minBirthFee', String(mbfVal));
        params.append('maxBirthFee', String(xbfVal));
        params.append('minPostpartumRate', String(mprVal));
        params.append('maxPostpartumRate', String(xprVal));

        const groups: Record<string, string[]> = {};
        Object.entries(currentExtraFilters).forEach(([key, active]) => {
          if (!active) return;
          const idx = key.indexOf('-');
          if (idx === -1) return;
          const groupName = key.substring(0, idx);
          const value = key.substring(idx + 1);
          if (!groups[groupName]) groups[groupName] = [];
          groups[groupName].push(value);
        });

        Object.entries(groups).forEach(([groupName, values]) => {
          params.append(groupName, values.join(','));
        });

        const response = await fetch(`/api/doulas?${params.toString()}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          let message = 'Failed to load doulas. Please try again.';
          try {
            const body = await response.json();
            if (body?.message) message = body.message;
          } catch {
            // intentionally swallowed — fall back to generic message
          }
          throw new Error(message);
        }

        const data: { doulas: Doula[] } = await response.json();
        setDoulas(data.doulas ?? []);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setDoulas([]);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const search = useCallback(() => {
    setIsSearchActive(true);
    fetchDoulas(zip, types, date, days, extraFilters, minBirthFee, maxBirthFee, minPostpartumRate, maxPostpartumRate);
  }, [fetchDoulas, zip, types, date, days, extraFilters, minBirthFee, maxBirthFee, minPostpartumRate, maxPostpartumRate]);

  const resetFilters = useCallback(() => {
    setZip('');
    setTypes([]);
    setDate(null);
    setDays([]);
    setExtraFilters({});
    setMinBirthFee(0);
    setMaxBirthFee(3000);
    setMinPostpartumRate(0);
    setMaxPostpartumRate(150);
    setIsSearchActive(false);
    fetchDoulas('', [], null, [], {}, 0, 3000, 0, 150);
  }, [fetchDoulas]);

  const toggleType = useCallback((type: DoulaType) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }, []);

  const toggleExtraFilter = useCallback((filterKey: string) => {
    setExtraFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchDoulas('', [], null, [], {}, 0, 3000, 0, 150);
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      abortRef.current?.abort();
    };
  }, [fetchDoulas]);

  useEffect(() => {
    if (isSearchActive) {
      if (zip.trim().length === 0 || zip.trim().length === 5) {
        const timeoutId = setTimeout(() => {
          fetchDoulas(zip, types, date, days, extraFilters, minBirthFee, maxBirthFee, minPostpartumRate, maxPostpartumRate);
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [isSearchActive, zip, types, date, days, extraFilters, minBirthFee, maxBirthFee, minPostpartumRate, maxPostpartumRate, fetchDoulas]);

  return {
    zip,
    setZip,
    types,
    toggleType,
    date,
    setDate,
    extraFilters,
    toggleExtraFilter,
    minBirthFee,
    setMinBirthFee,
    maxBirthFee,
    setMaxBirthFee,
    minPostpartumRate,
    setMinPostpartumRate,
    maxPostpartumRate,
    setMaxPostpartumRate,
    doulas,
    loading,
    error,
    isSearchActive,
    fetchDoulas: search,
    resetFilters,
  };
}
