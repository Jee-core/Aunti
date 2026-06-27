'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import DatePicker from './DatePicker';

interface HeroProps {
  zip: string;
  setZip: (val: string) => void;
  types: ('Birth' | 'Postpartum' | 'Full Spectrum')[];
  toggleType: (type: 'Birth' | 'Postpartum' | 'Full Spectrum') => void;
  date: string | null;
  setDate: (date: string | null) => void;
  onSearch: () => void;
  onReset: () => void;
}

export default function Hero({
  zip,
  setZip,
  types,
  toggleType,
  date,
  setDate,
  onSearch,
  onReset,
}: HeroProps) {
  const [zipError, setZipError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.length > 0 && zip.length !== 5) {
      setZipError('Zip code must be exactly 5 digits.');
      return;
    }
    setZipError(null);
    onSearch();
  };


  return (
    <section className="relative w-full overflow-hidden bg-[#FAF6F0] px-4 py-8 sm:px-6 sm:py-12 md:px-12 md:py-20 lg:px-24 lg:py-24">
      {/* BACKGROUND VECTOR BLOBS - hidden on very small screens to prevent overflow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Pink Circle - hidden on mobile */}
        <div className="absolute left-[44%] top-[25%] h-20 w-20 rounded-full bg-blob-pink opacity-90 hidden sm:block sm:h-32 sm:w-32 animate-float" style={{ animationDelay: '1s' }} />

        {/* Green Blob (Top Right) */}
        <svg
          viewBox="0 0 200 200"
          className="absolute -right-10 -top-10 w-[55%] sm:w-[45%] max-w-[400px] text-blob-green opacity-95 animate-float"
          fill="currentColor"
        >
          <path d="M45,-77.2C58.8,-70.7,70.9,-58.8,78.2,-44.6C85.5,-30.4,87.9,-13.9,86.6,2C85.3,17.9,80.2,33.1,72.2,46.5C64.2,59.9,53.2,71.5,39.6,77.5C26.1,83.5,9.9,83.9,-5.8,81.9C-21.5,79.9,-36.8,75.5,-50.2,67.8C-63.6,60.1,-75.1,49.2,-81.4,35.6C-87.8,22,-89,5.7,-86.6,-10.1C-84.2,-25.9,-78.3,-41.2,-68.2,-52.9C-58.2,-64.7,-44.1,-72.9,-30,-78.3C-15.9,-83.7,1.2,-86.2,15.8,-83.7C30.4,-81.2,31.2,-83.7,45,-77.2Z" transform="translate(100 100)" />
        </svg>

        {/* Dark Teal/Green Blob (Right Middle) - hidden on mobile */}
        <svg
          viewBox="0 0 200 200"
          className="absolute right-[5%] top-[35%] w-[25%] max-w-[240px] text-blob-teal opacity-95 animate-float hidden md:block"
          fill="currentColor"
          style={{ animationDelay: '2s' }}
        >
          <path d="M52.3,-71.4C66.5,-63.1,76.2,-47.1,80.7,-29.9C85.3,-12.8,84.7,5.5,79.9,22.7C75,39.9,65.9,56.1,51.8,65.6C37.8,75,18.9,77.8,-0.2,78C-19.3,78.3,-38.5,76.1,-53.4,66.8C-68.3,57.5,-78.7,41.2,-82.7,23.5C-86.7,5.7,-84.1,-13.6,-76.3,-29.9C-68.5,-46.2,-55.4,-59.6,-40.7,-67.7C-26.1,-75.7,-9.8,-78.5,7.7,-80.1C25.2,-81.7,38.1,-79.8,52.3,-71.4Z" transform="translate(100 100)" />
        </svg>

        {/* Blue Blob (Center-Right Lower) - hidden on mobile */}
        <svg
          viewBox="0 0 200 200"
          className="absolute right-[22%] top-[45%] w-[28%] max-w-[280px] text-blob-blue opacity-95 animate-float hidden md:block"
          fill="currentColor"
          style={{ animationDelay: '0.5s' }}
        >
          <path d="M42.7,-64.1C55.7,-57.4,66.9,-46.5,71.7,-33.2C76.4,-20,74.7,-4.3,71.1,10.6C67.6,25.4,62.2,39.3,52.8,50.3C43.3,61.3,29.8,69.3,14.6,73.5C-0.6,77.8,-17.5,78.3,-32.1,73.2C-46.7,68.2,-58.9,57.5,-67.3,44.4C-75.7,31.2,-80.2,15.6,-80.4,0.1C-80.6,-15.4,-76.4,-30.7,-68.2,-43.7C-60,-56.6,-47.7,-67.1,-34.1,-73.4C-20.5,-79.7,-5.7,-81.8,6.8,-80.4C19.3,-79,30,-75.9,42.7,-64.1Z" transform="translate(100 100)" />
        </svg>

        {/* Yellow/Orange Star-Blob (Bottom Right) - hidden on mobile */}
        <svg
          viewBox="0 0 200 200"
          className="absolute right-[8%] bottom-[-5%] w-[32%] max-w-[320px] text-blob-yellow opacity-95 animate-float hidden sm:block"
          fill="currentColor"
          style={{ animationDelay: '3s' }}
        >
          <path d="M63,-42.6C75.2,-23.7,74.1,6.5,63.9,29.3C53.7,52.1,34.3,67.6,12.7,72.6C-8.9,77.6,-32.7,72.2,-49,58.3C-65.3,44.5,-74.2,22.3,-72.9,1.7C-71.6,-18.8,-60.2,-37.7,-44.6,-56.1C-29,-74.6,-9.2,-92.5,12.4,-91.1C34,-89.7,50.9,-61.6,63,-42.6Z" transform="translate(100 100)" />
        </svg>

        {/* Sausage Orange Blob (Bottom Left Center) - hidden on mobile */}
        <svg
          viewBox="0 0 100 100"
          className="absolute left-[33%] bottom-[-8%] w-[16%] max-w-[150px] text-blob-orange opacity-95 animate-float hidden sm:block"
          fill="currentColor"
          style={{ animationDelay: '1.5s' }}
        >
          <path d="M25,-30C36,-18,48,-5,47,8C46,21,32,34,18,41C4,48,-10,49,-22,43C-34,37,-44,24,-47,9C-50,-6,-46,-23,-36,-35C-26,-47,-10,-54,3,-52C16,-50,14,-42,25,-30Z" transform="translate(50 50)" />
        </svg>

        {/* Light Blue Blob (Bottom Left) - hidden on mobile */}
        <svg
          viewBox="0 0 200 200"
          className="absolute left-[18%] bottom-[-10%] w-[25%] max-w-[250px] text-blob-lightblue opacity-95 animate-float hidden md:block"
          fill="currentColor"
          style={{ animationDelay: '2.5s' }}
        >
          <path d="M47.7,-64C60.6,-53.4,69.1,-37.1,70.9,-20.3C72.7,-3.6,67.8,13.5,58.9,27.8C50,42.1,37.1,53.6,21.9,60.8C6.7,68,-10.8,70.9,-27.1,66.8C-43.4,62.8,-58.5,51.8,-67.2,36.8C-75.9,21.8,-78.2,2.8,-74.2,-13.7C-70.2,-30.3,-59.8,-44.4,-46.5,-54.9C-33.2,-65.4,-17,-72.4,0.1,-72.5C17.2,-72.6,34.8,-74.6,47.7,-64Z" transform="translate(100 100)" />
        </svg>

        {/* Small Pink Blob on the right edge - hidden on mobile */}
        <div className="absolute -right-8 bottom-[15%] h-28 w-28 rounded-full bg-blob-pink opacity-80 blur-xs hidden sm:block" />
      </div>

      {/* HERO CONTENT: Search Card Container */}
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="w-full max-w-full xs:max-w-[480px] sm:max-w-[500px] rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-4.5 xs:p-6 sm:p-7 md:p-8 shadow-xl shadow-zinc-200/50">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <div>
              <h1 className="font-serif text-[19px] xs:text-[22px] sm:text-3xl md:text-4xl font-normal leading-tight text-zinc-900">
                Find a doula that feels like home
              </h1>
              <p className="font-sans text-[11px] xs:text-xs sm:text-sm font-bold text-zinc-800 mt-2 sm:mt-3 tracking-wide">
                Search our doula directory now
              </p>
            </div>

            {/* Zip Code Input */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label htmlFor="zipCode" className="font-sans text-[11px] xs:text-xs font-bold text-zinc-700 tracking-wide">
                Zip code
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 sm:top-3 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  id="zipCode"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value.replace(/\D/g, ''));
                    if (zipError) setZipError(null);
                  }}
                  placeholder="55555"
                  className={`w-full rounded border py-2 sm:py-2.5 pl-9 sm:pl-10 pr-4 font-sans text-xs sm:text-sm placeholder-zinc-400 transition-all focus:outline-none focus:ring-2 ${
                    zipError
                      ? 'border-red-500 text-red-900 focus:ring-red-500/40 focus:border-red-500 bg-red-50/20'
                      : 'border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300 focus:ring-brand-orange/40 focus:border-brand-orange'
                  }`}
                />
              </div>
              {zipError && (
                <p className="font-sans text-[10px] sm:text-xs text-red-500 font-semibold">{zipError}</p>
              )}
            </div>

            {/* Checkboxes: Doula Types */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-sans text-[11px] xs:text-xs font-bold text-zinc-700 tracking-wide">
                What type of doula are you looking for?
              </label>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 mt-0.5 sm:mt-1">
                {(['Birth', 'Postpartum', 'Full Spectrum'] as const).map((type) => (
                  <label key={type} className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={types.includes(type)}
                      onChange={() => toggleType(type)}
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-zinc-300 text-brand-orange focus:ring-brand-orange cursor-pointer accent-brand-orange"
                    />
                    <span className="font-sans text-[11px] sm:text-xs font-medium text-zinc-700 group-hover:text-brand-orange transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Expected Due Date DatePicker */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <label className="font-sans text-[11px] xs:text-xs font-bold text-zinc-700 tracking-wide">
                Expected due date (or baby&apos;s birth date)
              </label>
              <DatePicker selectedDate={date} onChange={setDate} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 mt-1">
              <button
                type="submit"
                className="w-full rounded bg-brand-menu py-2.5 sm:py-3 font-sans text-xs sm:text-sm font-bold tracking-wide text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                Search
              </button>
              <button
                type="button"
                onClick={onReset}
                className="w-full rounded border border-zinc-300 bg-white py-2.5 sm:py-3 font-sans text-xs sm:text-sm font-bold tracking-wide text-zinc-700 transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              >
                Reset filters
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
