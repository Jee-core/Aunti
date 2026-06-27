'use client';

import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface AccordionItem {
  id: number;
  title: string;
  content: string;
  isComingSoon?: boolean;
}

const items: AccordionItem[] = [
  {
    id: 1,
    title: 'Search based on your needs',
    content:
      'Filter our extensive directory by location, doula specialty (birth, postpartum, or full spectrum support), and matching available dates to find local care that aligns perfectly with your birth plan.',
  },
  {
    id: 2,
    title: 'Explore doulas near you',
    content:
      'Browse detailed profiles, compare experience, availability, pricing, and specialties. Filter by what matters most to you—like specialties, cultural identity, or languages spoken.',
  },
  {
    id: 3,
    title: 'Reach out and connect',
    content:
      'Initiate a message or book a free consultation call directly from their profile. Ask questions, discuss your expectations, and check compatibility with zero pressure.',
  },
  {
    id: 4,
    title: 'Book confidently',
    content:
      'Secure your doula services, sign agreements, and manage payments safely through Aunti. We also support documents and invoices for easy HSA/FSA or insurance claims.',
    isComingSoon: true,
  },
  {
    id: 5,
    title: 'Feel supported, at every step',
    content:
      'Enjoy dedicated tools, checklists, and direct channels to stay connected with your doula and access curated resources throughout your pregnancy and postpartum transition.',
  },
];

export default function HowItWorks() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="w-full bg-[#0E1521] py-10 px-4 sm:py-14 sm:px-6 md:py-20 md:px-12 lg:py-24 lg:px-24 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-8">

        {/* Left Column */}
        <div className="flex flex-col items-start gap-8 lg:col-span-5">
          {/* Brand blob icon */}
          <div className="relative h-12 w-20 flex-shrink-0">
            <div className="absolute left-0 top-0 h-10 w-12 rounded-full bg-[#76A63F]" />
            <div className="absolute left-6 top-1 h-10 w-10 rounded-full bg-[#E05A36]" />
          </div>

          <h2 className="font-serif text-[24px] sm:text-4xl md:text-5xl font-normal leading-tight text-white">
            How it works
          </h2>

          <button className="group flex items-center gap-2 rounded border border-white/30 px-4 sm:px-5 py-2.5 font-sans text-sm font-semibold text-white transition-all hover:bg-white hover:text-[#0E1521] focus:outline-none focus:ring-2 focus:ring-[#E05A36]">
            <span>See more FAQs</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Column — Accordion */}
        <div className="lg:col-span-7 flex flex-col divide-y divide-white/10">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                {/* Trigger row */}
                <button
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-4 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A36] focus-visible:ring-inset"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-serif text-base sm:text-lg md:text-xl font-normal text-white transition-colors group-hover:text-[#E05A36]">
                      {item.title}
                    </span>
                    {item.isComingSoon && (
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        Coming soon
                      </span>
                    )}
                  </div>

                  <ChevronDown
                    aria-hidden
                    className={[
                      'h-5 w-5 flex-shrink-0 text-white/50 transition-all duration-300',
                      'group-hover:text-[#E05A36]',
                      isOpen ? 'rotate-180 !text-[#E05A36]' : '',
                    ].join(' ')}
                  />
                </button>

                {/* Collapsible body — grid trick gives smooth height animation */}
                <div
                  className={[
                    'grid transition-all duration-300 ease-in-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 font-sans text-sm md:text-base leading-relaxed text-zinc-300">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
