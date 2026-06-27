'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchResults from '../components/SearchResults';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import { useDoulas } from '../hooks/useDoulas';

export default function Home() {
  const {
    zip,
    setZip,
    types,
    toggleType,
    date,
    setDate,
    days,
    toggleDay,
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
    fetchDoulas,
    resetFilters,
  } = useDoulas();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF6F0]">
      {/* Top Navigation */}
      <Navbar />

      <main className="flex-grow">
        {!isSearchActive ? (
          <>
            {/* Hero Form section with organic background blobs */}
            <Hero
              zip={zip}
              setZip={setZip}
              types={types}
              toggleType={toggleType}
              date={date}
              setDate={setDate}
              onSearch={fetchDoulas}
              onReset={resetFilters}
            />
            {/* How It Works Accordion Section */}
            <HowItWorks />
          </>
        ) : (
          /* Active Search Results Section (lists doulas with filters sidebar on left) */
          <SearchResults
            doulas={doulas}
            loading={loading}
            error={error}
            onRetry={fetchDoulas}
            onReset={resetFilters}
            zip={zip}
            setZip={setZip}
            types={types}
            toggleType={toggleType}
            date={date}
            setDate={setDate}
            extraFilters={extraFilters}
            toggleExtraFilter={toggleExtraFilter}
            minBirthFee={minBirthFee}
            setMinBirthFee={setMinBirthFee}
            maxBirthFee={maxBirthFee}
            setMaxBirthFee={setMaxBirthFee}
            minPostpartumRate={minPostpartumRate}
            setMinPostpartumRate={setMinPostpartumRate}
            maxPostpartumRate={maxPostpartumRate}
            setMaxPostpartumRate={setMaxPostpartumRate}
          />
        )}
      </main>

      {/* Footer Section */}
      <Footer isSearchActive={isSearchActive} />
    </div>
  );
}
