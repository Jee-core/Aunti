'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: string | null;
  onChange: (date: string | null) => void;
}

export default function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    // Default to June 2026 as in metadata or current date
    return new Date(2026, 5, 26);
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDaySelect = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    // Adjust to local time format YYYY-MM-DD
    const y = selected.getFullYear();
    const m = String(selected.getMonth() + 1).padStart(2, '0');
    const d = String(selected.getDate()).padStart(2, '0');
    const formatted = `${y}-${m}-${d}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create grid arrays
  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const gridCells = [...blanks, ...days];

  const formatDateLabel = (dateStr: string | null) => {
    if (!dateStr) return 'Select date';
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded border border-zinc-200 bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 text-left font-sans text-xs sm:text-sm text-zinc-600 transition-all hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-orange/40 focus:border-brand-orange"
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4.5 w-4.5 text-zinc-400" />
          <span className={selectedDate ? 'text-zinc-800 font-medium' : 'text-zinc-400'}>
            {formatDateLabel(selectedDate)}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-lg border border-zinc-200 bg-white p-4 shadow-xl">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="rounded p-1 text-zinc-600 hover:bg-zinc-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="font-sans text-sm font-semibold text-zinc-800">
              {monthNames[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="rounded p-1 text-zinc-600 hover:bg-zinc-100"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday labels */}
          <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-zinc-400">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {gridCells.map((cell, idx) => {
              if (cell === null) {
                return <div key={`empty-${idx}`} className="h-8 w-8" />;
              }

              const cellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(cell).padStart(2, '0')}`;
              const isSelected = selectedDate === cellDate;

              return (
                <button
                  key={`day-${cell}`}
                  type="button"
                  onClick={() => handleDaySelect(cell)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-brand-orange text-white'
                      : 'text-zinc-700 hover:bg-brand-orange/10 hover:text-brand-orange'
                  }`}
                >
                  {cell}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
