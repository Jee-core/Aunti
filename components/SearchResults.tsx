'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, AlertTriangle, RefreshCw, Sparkles, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { Doula } from '../types/doula';
import DatePicker from './DatePicker';

type DoulaType = 'Birth' | 'Postpartum' | 'Full Spectrum';

const TYPE_LABELS: Record<string, DoulaType> = {
  'Birth Doula': 'Birth',
  'Postpartum Doula': 'Postpartum',
  'Full Spectrum Doula': 'Full Spectrum',
};

interface SearchResultsProps {
  doulas: Doula[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onReset: () => void;
  zip: string;
  setZip: (val: string) => void;
  types: DoulaType[];
  toggleType: (type: DoulaType) => void;
  date: string | null;
  setDate: (date: string | null) => void;
  extraFilters: Record<string, boolean>;
  toggleExtraFilter: (filterKey: string) => void;
  minBirthFee: number;
  setMinBirthFee: (val: number) => void;
  maxBirthFee: number;
  setMaxBirthFee: (val: number) => void;
  minPostpartumRate: number;
  setMinPostpartumRate: (val: number) => void;
  maxPostpartumRate: number;
  setMaxPostpartumRate: (val: number) => void;
}

export default function SearchResults({
  doulas,
  loading,
  error,
  onRetry,
  onReset,
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
}: SearchResultsProps) {
  const [sidebarZipError, setSidebarZipError] = useState<string | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    care: false,
    cert: false,
    inclusive: false,
    special: false,
    support: false,
    lang: false,
  });

  const [sortBy, setSortBy] = useState<'best' | 'rating' | 'price_asc' | 'price_desc'>('best');

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleZipChange = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setZip(clean);
    if (clean.length === 5 || clean.length === 0) {
      setSidebarZipError(null);
    } else {
      setSidebarZipError('Zip code must be 5 digits.');
    }
  };

  const handleMinBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinBirthFee(Math.min(Number(e.target.value), maxBirthFee - 100));
  };
  const handleMaxBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxBirthFee(Math.max(Number(e.target.value), minBirthFee + 100));
  };

  const handleMinPostpartumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPostpartumRate(Math.min(Number(e.target.value), maxPostpartumRate - 5));
  };
  const handleMaxPostpartumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPostpartumRate(Math.max(Number(e.target.value), minPostpartumRate + 5));
  };

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-12 lg:px-24">
        <h2 className="mb-6 font-serif text-2xl font-normal text-zinc-800">
          Finding doulas that feel like home...
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="relative flex flex-col md:flex-row justify-between gap-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
              <div className="flex gap-4 flex-1">
                <div className="h-28 w-28 rounded-xl bg-zinc-200 animate-pulse flex-shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-1/3 rounded bg-zinc-200 animate-pulse" />
                  <div className="h-3 w-1/4 rounded bg-zinc-200 animate-pulse" />
                  <div className="h-3 w-2/3 rounded bg-zinc-100 animate-pulse mt-4" />
                </div>
              </div>
              <div className="w-full md:w-48 space-y-2 border-t md:border-t-0 md:border-l border-zinc-100 pt-4 md:pt-0 md:pl-6">
                <div className="h-3 w-2/3 rounded bg-zinc-200 animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-zinc-200 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 mb-4">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-2">Search Failed</h2>
        <p className="text-zinc-600 mb-6 max-w-md mx-auto">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry Search</span>
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1400px] px-3 py-4 sm:px-5 sm:py-8 lg:px-4 xl:px-8 md:py-10">
      {/* Search results layout container */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-4 xl:gap-6 2xl:gap-8">
        
        {/* SIDEBAR FILTER PANEL */}
        <aside className="w-full lg:w-[260px] xl:w-[320px] 2xl:w-[384px] flex-shrink-0 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 lg:p-5 xl:p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h2 className="font-serif text-base sm:text-xl lg:text-2xl font-normal text-zinc-900">Find a doula</h2>
            </div>

            {/* ZIP Code Input */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="sidebarZip" className="font-sans text-[10px] sm:text-xs font-bold text-zinc-700 tracking-wide">
                ZIP code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  id="sidebarZip"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => handleZipChange(e.target.value)}
                  placeholder="e.g. 98102"
                  className={`w-full rounded border py-2 sm:py-2.5 pl-9 sm:pl-10 pr-4 font-sans text-[11px] sm:text-sm placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${
                    sidebarZipError
                      ? 'border-red-500 text-red-900 focus:ring-red-500/40 focus:border-red-500 bg-red-50/20'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 focus:ring-brand-orange/40 focus:border-brand-orange'
                  }`}
                />
              </div>
              {sidebarZipError && (
                <p className="font-sans text-[10px] sm:text-xs text-red-500 font-semibold">{sidebarZipError}</p>
              )}
            </div>

            {/* Specialty Checkboxes */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-sans text-[10px] sm:text-xs font-bold text-zinc-700 tracking-wide">
                Specialty
              </label>
              <div className="flex flex-col gap-2 sm:gap-3">
                {(Object.keys(TYPE_LABELS) as Array<keyof typeof TYPE_LABELS>).map((typeLabel) => {
                  const typeValue = TYPE_LABELS[typeLabel];
                  return (
                    <label key={typeLabel} className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={types.includes(typeValue)}
                        onChange={() => toggleType(typeValue)}
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange cursor-pointer accent-brand-orange"
                      />
                      <span className="font-sans text-[11px] sm:text-sm font-medium text-zinc-700 group-hover:text-brand-orange transition-colors">
                        {typeLabel}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Expected Due Date */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-sans text-[10px] sm:text-xs font-bold text-zinc-700 tracking-wide">
                Expected due date (or baby&apos;s birth date)
              </label>
              <DatePicker selectedDate={date} onChange={setDate} />
            </div>


            {/* Birth Support Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline font-sans text-[10px] sm:text-xs font-bold text-zinc-700 tracking-wide">
                <span>Birth Support (total fee)</span>
                <span className="text-zinc-600 font-semibold font-mono">${minBirthFee}–${maxBirthFee}</span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div className="absolute left-0 right-0 h-1 bg-zinc-100 rounded-full" />
                <div
                  className="absolute h-1 bg-brand-orange rounded-full"
                  style={{
                    left: `${(minBirthFee / 3000) * 100}%`,
                    right: `${100 - (maxBirthFee / 3000) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={minBirthFee}
                  onChange={handleMinBirthChange}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-30 accent-brand-orange"
                  style={{ pointerEvents: 'auto' }}
                />
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={maxBirthFee}
                  onChange={handleMaxBirthChange}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-40 accent-brand-orange"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
            </div>

            {/* Postpartum Support Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-baseline font-sans text-[10px] sm:text-xs font-bold text-zinc-700 tracking-wide">
                <span>Postpartum Support (hourly rate)</span>
                <span className="text-zinc-600 font-semibold font-mono">${minPostpartumRate}–${maxPostpartumRate}</span>
              </div>
              <div className="relative w-full h-6 flex items-center">
                <div className="absolute left-0 right-0 h-1 bg-zinc-100 rounded-full" />
                <div
                  className="absolute h-1 bg-brand-orange rounded-full"
                  style={{
                    left: `${(minPostpartumRate / 150) * 100}%`,
                    right: `${100 - (maxPostpartumRate / 150) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="5"
                  value={minPostpartumRate}
                  onChange={handleMinPostpartumChange}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-30 accent-brand-orange"
                  style={{ pointerEvents: 'auto' }}
                />
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="5"
                  value={maxPostpartumRate}
                  onChange={handleMaxPostpartumChange}
                  className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none z-40 accent-brand-orange"
                  style={{ pointerEvents: 'auto' }}
                />
              </div>
            </div>

            <div className="border-t border-zinc-100 pt-4 sm:pt-5">
              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <span className="font-sans text-xs sm:text-sm font-extrabold text-zinc-900">Filters</span>
                <button
                  type="button"
                  onClick={onReset}
                  className="font-sans text-[10px] sm:text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Reset filters
                </button>
              </div>
              <div className="flex flex-col divide-y divide-zinc-100">
                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('care')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Type of care offered</span>
                    {openSections.care ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.care ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['Antepartum support', 'Overnight support', 'Lactation consultation', 'Sibling support'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`care-${opt}`]}
                            onChange={() => toggleExtraFilter(`care-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('cert')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Certification</span>
                    {openSections.cert ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.cert ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['DONA International', 'CAPPA Certified', 'ICEA Certified', 'ProDoula Certified'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`cert-${opt}`]}
                            onChange={() => toggleExtraFilter(`cert-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('inclusive')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Inclusive care</span>
                    {openSections.inclusive ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.inclusive ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['LGBTQ+ Friendly', 'Single Parent Support', 'Teen Parent Support', 'Surrogacy & Adoption'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`inc-${opt}`]}
                            onChange={() => toggleExtraFilter(`inc-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('special')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Special circumstances</span>
                    {openSections.special ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.special ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['Twins/Multiples', 'High-risk Pregnancy', 'VBAC Support', 'IVF Support'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`spec-${opt}`]}
                            onChange={() => toggleExtraFilter(`spec-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('support')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Support type</span>
                    {openSections.support ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.support ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['Physical comfort', 'Emotional support', 'Partner support', 'Evidence-based info'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`sup-${opt}`]}
                            onChange={() => toggleExtraFilter(`sup-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="py-2 sm:py-3">
                  <button
                    type="button"
                    onClick={() => toggleSection('lang')}
                    className="flex w-full justify-between items-center text-left text-[11px] sm:text-sm font-semibold text-zinc-800 hover:text-brand-orange transition-colors"
                  >
                    <span>Languages spoken</span>
                    {openSections.lang ? <ChevronUp className="h-4.5 w-4.5 text-zinc-400" /> : <ChevronDown className="h-4.5 w-4.5 text-zinc-400" />}
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openSections.lang ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden flex flex-col gap-2.5 pl-1">
                      {['English', 'Spanish', 'French', 'Chinese', 'American Sign Language'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!extraFilters[`lang-${opt}`]}
                            onChange={() => toggleExtraFilter(`lang-${opt}`)}
                            className="h-4 w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange accent-brand-orange"
                          />
                          <span className="text-xs font-medium text-zinc-600 group-hover:text-brand-orange transition-colors">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-grow min-w-0 w-full">
          <div className="mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-sans text-sm sm:text-base font-extrabold text-zinc-900">
              {doulas.length} matching doulas
            </h3>
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'best' | 'rating' | 'price_asc' | 'price_desc')}
                className="appearance-none rounded-lg border border-zinc-300 bg-white py-1.5 pl-3 pr-9 text-xs font-bold text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange cursor-pointer"
              >
                <option value="best">Best match</option>
                <option value="rating">Rating (highest first)</option>
                <option value="price_asc">Price (lowest first)</option>
                <option value="price_desc">Price (highest first)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            </div>
          </div>


          {doulas.length === 0 ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12 text-center shadow-sm">
              <Sparkles className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-zinc-300 mb-4" />
              <h4 className="font-serif text-lg sm:text-xl font-bold text-zinc-950 mb-2">No Matching Doulas</h4>
              <p className="text-zinc-600 text-sm max-w-sm mx-auto mb-6">
                No profiles match your current sidebar filters. Try widening your ZIP code or resetting your price and date filters.
              </p>
              <button
                onClick={onReset}
                className="rounded bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-zinc-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {[...doulas].sort((a, b) => {
                if (sortBy === 'rating') {
                  return b.rating - a.rating;
                }
                if (sortBy === 'price_asc') {
                  const priceA = a.packagesStartAt ?? 0;
                  const priceB = b.packagesStartAt ?? 0;
                  return priceA - priceB;
                }
                if (sortBy === 'price_desc') {
                  const priceA = a.packagesStartAt ?? 0;
                  const priceB = b.packagesStartAt ?? 0;
                  return priceB - priceA;
                }
                // 'best' match: rosette badge first, then rating, then reviews count
                if (sortBy === 'best') {
                  if (a.hasRosetteBadge && !b.hasRosetteBadge) return -1;
                  if (!a.hasRosetteBadge && b.hasRosetteBadge) return 1;
                  if (b.rating !== a.rating) return b.rating - a.rating;
                  const reviewsA = a.testimonialsCount ?? a.reviewCount ?? 0;
                  const reviewsB = b.testimonialsCount ?? b.reviewCount ?? 0;
                  return reviewsB - reviewsA;
                }
                return 0;
              }).map((doula) => (
                <div
                  key={doula.id}
                  className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-4 xl:gap-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-3 sm:p-4 md:p-4 lg:p-5 xl:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
                >
                  <Image
                    src={doula.imageUrl}
                    alt={doula.name}
                    width={200}
                    height={200}
                    className="w-[76px] h-[76px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[190px] lg:h-[190px] xl:w-[200px] xl:h-[200px] object-cover flex-shrink-0 bg-zinc-50 border border-zinc-100 self-start"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/riley_johnston.png'; }}
                  />

                  <div className="flex flex-col justify-between flex-grow min-w-0 sm:pl-1 md:pl-2 lg:pl-4 xl:pl-5 lg:min-h-[190px]">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="font-serif text-base sm:text-xl md:text-[22px] lg:text-[24px] xl:text-[26px] font-normal text-zinc-900 leading-snug">
                          {doula.name}
                        </h4>
                        {doula.hasRosetteBadge && (
                          <span
                            className="flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-amber-100 text-amber-600 flex-shrink-0"
                            title="Verified Premium Provider"
                          >
                            <Award className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-zinc-500 font-sans text-[10px] sm:text-[13px] md:text-[14px] font-medium mt-1 sm:mt-1.5">
                        <span className="whitespace-nowrap">{doula.city}, {doula.state}</span>
                        <span className="text-zinc-300">|</span>
                        <span className="whitespace-nowrap">{doula.pronouns ?? 'she/her'}</span>
                        <span className="text-zinc-300">|</span>
                        {doula.badgeText ? (
                          <span className="rounded-full bg-red-50 border border-red-100 px-2 py-0.5 text-[10px] font-bold text-red-500 whitespace-nowrap">
                            {doula.badgeText}
                          </span>
                        ) : (
                          <button type="button" className="text-[#1B52B3] hover:underline text-left whitespace-nowrap font-medium">
                            {doula.testimonialsCount ?? doula.reviewCount} Testimonials
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="doula-tags mt-2 sm:mt-3 md:mt-4">
                      {(() => {
                        const allTags = doula.tags ?? [doula.type + ' Doula'];
                        const visibleTags = allTags.slice(0, 5);
                        const extraCount = allTags.length - 5;
                        return (
                          <>
                            {visibleTags.map((tag) => (
                              <span
                                key={tag}
                                className="doula-tag rounded-[6px] border border-[#E8E0D8] bg-[#FAF6F0] px-2.5 py-1 text-xs sm:text-[13px] font-medium text-[#5C5450]"
                              >
                                {tag}
                              </span>
                            ))}
                            {extraCount > 0 && (
                              <span
                                className="doula-tag rounded-[6px] border border-[#E8E0D8] bg-[#FAF6F0] px-2.5 py-1 text-xs sm:text-[13px] font-medium text-[#5C5450]"
                              >
                                +{extraCount} more
                              </span>
                            )}
                          </>
                        );
                      })()}
                    </div>

                    <div className="mt-2 sm:mt-3 md:mt-4">
                      <button type="button" className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1B52B3] hover:underline transition-colors">
                        <span>View profile</span>
                        <span className="text-sm sm:text-lg leading-none">→</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full sm:w-[165px] md:w-[180px] lg:w-[185px] xl:w-[200px] mt-2 sm:mt-0">
                    <div className="border border-zinc-200 lg:border-0 rounded-xl sm:rounded-2xl lg:rounded-none bg-white lg:bg-transparent p-3 sm:p-3.5 lg:p-0 w-full flex flex-col">
                      <div className="pb-2 sm:pb-2.5 border-b border-zinc-200/80">
                        <span className="block font-sans text-[9px] sm:text-xs font-bold text-[#00664B] mb-0.5">
                          Packages start at
                        </span>
                        <span className="font-sans text-base sm:text-xl lg:text-[20px] xl:text-[22px] font-bold text-zinc-900 leading-none">
                          ${(doula.packagesStartAt ?? 0).toLocaleString('en-US', { minimumFractionDigits: doula.packagesStartAt === 1 ? 2 : 0 })}
                        </span>
                      </div>

                      <div className="py-2 sm:py-2.5 border-b border-zinc-200/80">
                        <span className="block font-sans text-[9px] sm:text-xs font-bold text-[#00664B] mb-0.5">
                          Add-on services start at
                        </span>
                        <span className="font-sans text-sm sm:text-base lg:text-[20px] xl:text-[22px] font-bold text-zinc-900 leading-none">
                          ${doula.addOnServicesStartAt ?? 35}/hr
                        </span>
                      </div>

                      <div className={`py-2 sm:py-2.5 border-b border-zinc-200/80 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-medium ${doula.hasSlidingScale ? 'text-[#00664B]' : 'text-zinc-400'}`}>
                        {doula.hasSlidingScale ? (
                          <>
                            <span className="text-[#00664B] font-bold text-xs sm:text-sm leading-none w-4 h-4 flex items-center justify-center flex-shrink-0">✓</span>
                            <span className="whitespace-nowrap text-zinc-700">Sliding scale</span>
                          </>
                        ) : (
                          <>
                            <span className="text-zinc-400 font-semibold leading-none w-4 h-4 flex items-center justify-center flex-shrink-0">✕</span>
                            <span className="whitespace-nowrap text-zinc-400">Sliding scale</span>
                          </>
                        )}
                      </div>

                      <div className={`pt-2 sm:pt-2.5 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-medium ${doula.hasPaymentPlans ? 'text-[#00664B]' : 'text-zinc-400'}`}>
                        {doula.hasPaymentPlans ? (
                          <>
                            <span className="text-[#00664B] font-bold text-xs sm:text-sm leading-none w-4 h-4 flex items-center justify-center flex-shrink-0">✓</span>
                            <span className="whitespace-nowrap text-zinc-700">Payment plans</span>
                          </>
                        ) : (
                          <>
                            <span className="text-zinc-400 font-semibold leading-none w-4 h-4 flex items-center justify-center flex-shrink-0">✕</span>
                            <span className="whitespace-nowrap text-zinc-400">Payment plans</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          )}
        </div>

      </div>
    </section>
  );
}
