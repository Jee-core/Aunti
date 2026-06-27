'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Heart, HelpCircle, LogIn, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-[#FAF6F0]/95 backdrop-blur-sm shadow-sm px-4 py-3 sm:px-6 sm:py-4 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Left Side: Logo & Submenu */}
        <div className="flex items-center gap-4 sm:gap-8 min-w-0">
          <Link href="/" className="group flex items-baseline gap-1 flex-shrink-0">
            <span className="font-sans text-2xl sm:text-3xl font-black tracking-tight text-brand-orange transition-colors duration-200">
              Aunti
            </span>
            <span className="h-2 w-2 rounded-full bg-brand-orange transition-transform duration-300 group-hover:scale-125"></span>
          </Link>
          <Link
            href="#"
            className="hidden font-sans text-sm font-semibold text-zinc-800 transition-colors hover:text-brand-orange sm:inline-block truncate"
          >
            Find a doula
          </Link>
        </div>

        {/* Right Side: Primary CTA & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* CTA: hide text label on very small screens, show icon only */}
          <button className="flex items-center gap-2 rounded bg-brand-menu px-3 py-2 sm:px-4 sm:py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wide text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2">
            <Heart className="h-4 w-4 stroke-[2.5] flex-shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">List your doula services</span>
          </button>

          {/* Menu Trigger Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-[38px] w-[38px] sm:h-[40px] sm:w-[40px] items-center justify-center rounded border border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 sm:w-56 rounded-lg border border-zinc-100 bg-white py-1 shadow-lg ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-brand-orange transition-colors"
                >
                  <HelpCircle className="h-4 w-4 text-zinc-500 hover:text-brand-orange flex-shrink-0" />
                  <span>FAQs</span>
                </Link>
                <div className="border-t border-zinc-100"></div>
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-brand-orange transition-colors"
                >
                  <LogIn className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <span>Doula sign in</span>
                </Link>
                <div className="border-t border-zinc-100"></div>
                <Link
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 font-sans text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-brand-orange transition-colors"
                >
                  <Heart className="h-4 w-4 text-zinc-500 flex-shrink-0" />
                  <span>Doula sign up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
