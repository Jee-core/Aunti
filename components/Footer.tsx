import Link from 'next/link';

interface FooterProps {
  isSearchActive?: boolean;
}

export default function Footer({ isSearchActive = false }: FooterProps) {
  return (
    <footer
      className={`relative w-full ${
        isSearchActive
          ? 'overflow-hidden bg-[#0E1521] text-white pt-8 pb-10 px-5 sm:pt-16 sm:pb-20 sm:px-10 md:px-16 lg:px-24'
          : 'bg-[#FAF6F0] border-t border-zinc-200/60 pt-8 pb-10 px-5 sm:pt-16 sm:pb-20 sm:px-10 md:px-16 lg:px-24 text-zinc-900'
      }`}
    >
      {/* BACKGROUND VECTOR BLOBS - Only render on active search results page */}
      {isSearchActive && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Pink blob at top-middle */}
          <div className="absolute left-[50%] -top-8 h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-blob-pink opacity-90" />

          {/* Green blob at top-middle/right */}
          <svg
            viewBox="0 0 200 200"
            className="absolute left-[62%] -top-12 w-[18%] text-blob-green opacity-95"
            fill="currentColor"
          >
            <path d="M45,-77.2C58.8,-70.7,70.9,-58.8,78.2,-44.6C85.5,-30.4,87.9,-13.9,86.6,2C85.3,17.9,80.2,33.1,72.2,46.5C64.2,59.9,53.2,71.5,39.6,77.5C26.1,83.5,9.9,83.9,-5.8,81.9C-21.5,79.9,-36.8,75.5,-50.2,67.8C-63.6,60.1,-75.1,49.2,-81.4,35.6C-87.8,22,-89,5.7,-86.6,-10.1C-84.2,-25.9,-78.3,-41.2,-68.2,-52.9C-58.2,-64.7,-44.1,-72.9,-30,-78.3C-15.9,-83.7,1.2,-86.2,15.8,-83.7C30.4,-81.2,31.2,-83.7,45,-77.2Z" transform="translate(100 100)" />
          </svg>

          {/* Orange blob at top right */}
          <svg
            viewBox="0 0 100 100"
            className="absolute right-[10%] -top-4 w-[5%] text-blob-orange opacity-95"
            fill="currentColor"
          >
            <path d="M25,-30C36,-18,48,-5,47,8C46,21,32,34,18,41C4,48,-10,49,-22,43C-34,37,-44,24,-47,9C-50,-6,-46,-23,-36,-35C-26,-47,-10,-54,3,-52C16,-50,14,-42,25,-30Z" transform="translate(50 50)" />
          </svg>

          {/* Teal blob on right middle */}
          <svg
            viewBox="0 0 200 200"
            className="absolute right-[16%] top-[12%] w-[15%] text-blob-teal opacity-95"
            fill="currentColor"
          >
            <path d="M52.3,-71.4C66.5,-63.1,76.2,-47.1,80.7,-29.9C85.3,-12.8,84.7,5.5,79.9,22.7C75,39.9,65.9,56.1,51.8,65.6C37.8,75,18.9,77.8,-0.2,78C-19.3,78.3,-38.5,76.1,-53.4,66.8C-68.3,57.5,-78.7,41.2,-82.7,23.5C-86.7,5.7,-84.1,-13.6,-76.3,-29.9C-68.5,-46.2,-55.4,-59.6,-40.7,-67.7C-26.1,-75.7,-9.8,-78.5,7.7,-80.1C25.2,-81.7,38.1,-79.8,52.3,-71.4Z" transform="translate(100 100)" />
          </svg>

          {/* Blue blob in bottom center/left */}
          <svg
            viewBox="0 0 200 200"
            className="absolute left-[58%] top-[38%] w-[16%] text-blob-blue opacity-95"
            fill="currentColor"
          >
            <path d="M42.7,-64.1C55.7,-57.4,66.9,-46.5,71.7,-33.2C76.4,-20,74.7,-4.3,71.1,10.6C67.6,25.4,62.2,39.3,52.8,50.3C43.3,61.3,29.8,69.3,14.6,73.5C-0.6,77.8,-17.5,78.3,-32.1,73.2C-46.7,68.2,-58.9,57.5,-67.3,44.4C-75.7,31.2,-80.2,15.6,-80.4,0.1C-80.6,-15.4,-76.4,-30.7,-68.2,-43.7C-60,-56.6,-47.7,-67.1,-34.1,-73.4C-20.5,-79.7,-5.7,-81.8,6.8,-80.4C19.3,-79,30,-75.9,42.7,-64.1Z" transform="translate(100 100)" />
          </svg>

          {/* Orange blob peaking at bottom */}
          <svg
            viewBox="0 0 100 100"
            className="absolute left-[53%] -bottom-8 w-[7%] text-blob-orange opacity-95"
            fill="currentColor"
          >
            <path d="M25,-30C36,-18,48,-5,47,8C46,21,32,34,18,41C4,48,-10,49,-22,43C-34,37,-44,24,-47,9C-50,-6,-46,-23,-36,-35C-26,-47,-10,-54,3,-52C16,-50,14,-42,25,-30Z" transform="translate(50 50)" />
          </svg>

          {/* Yellow/Orange blob peaking at bottom center-right */}
          <svg
            viewBox="0 0 200 200"
            className="absolute left-[73%] -bottom-20 w-[15%] text-blob-yellow opacity-95"
            fill="currentColor"
          >
            <path d="M63,-42.6C75.2,-23.7,74.1,6.5,63.9,29.3C53.7,52.1,34.3,67.6,12.7,72.6C-8.9,77.6,-32.7,72.2,-49,58.3C-65.3,44.5,-74.2,22.3,-72.9,1.7C-71.6,-18.8,-60.2,-37.7,-44.6,-56.1C-29,-74.6,-9.2,-92.5,12.4,-91.1C34,-89.7,50.9,-61.6,63,-42.6Z" transform="translate(100 100)" />
          </svg>

          {/* Pink Circle at bottom right */}
          <div className="absolute right-[10%] -bottom-10 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-blob-pink opacity-90" />

          {/* Light blue shape on the right edge */}
          <svg
            viewBox="0 0 200 200"
            className="absolute -right-16 top-[38%] w-[14%] text-blob-lightblue opacity-95"
            fill="currentColor"
          >
            <path d="M42.7,-64.1C55.7,-57.4,66.9,-46.5,71.7,-33.2C76.4,-20,74.7,-4.3,71.1,10.6C67.6,25.4,62.2,39.3,52.8,50.3C43.3,61.3,29.8,69.3,14.6,73.5C-0.6,77.8,-17.5,78.3,-32.1,73.2C-46.7,68.2,-58.9,57.5,-67.3,44.4C-75.7,31.2,-80.2,15.6,-80.4,0.1C-80.6,-15.4,-76.4,-30.7,-68.2,-43.7C-60,-56.6,-47.7,-67.1,-34.1,-73.4C-20.5,-79.7,-5.7,-81.8,6.8,-80.4C19.3,-79,30,-75.9,42.7,-64.1Z" transform="translate(100 100)" />
          </svg>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-10 md:gap-8 items-start">
          {/* About Aunti */}
          <div className="sm:col-span-1 md:col-span-3 flex flex-col gap-3 sm:gap-5">
            <h3
              className={`font-serif text-[18px] sm:text-[22px] md:text-[26px] font-normal ${
                isSearchActive ? 'text-white' : 'text-zinc-900'
              }`}
            >
              About Aunti
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-4">
              <li>
                <Link
                  href="#"
                  className={`font-sans text-[13px] sm:text-[15px] font-semibold transition-colors hover:underline ${
                    isSearchActive
                      ? 'text-white/90 hover:text-white'
                      : 'text-zinc-600 hover:text-brand-orange'
                  }`}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`font-sans text-[13px] sm:text-[15px] font-semibold transition-colors hover:underline ${
                    isSearchActive
                      ? 'text-white/90 hover:text-white'
                      : 'text-zinc-600 hover:text-brand-orange'
                  }`}
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`font-sans text-[13px] sm:text-[15px] font-semibold transition-colors hover:underline ${
                    isSearchActive
                      ? 'text-white/90 hover:text-white'
                      : 'text-zinc-600 hover:text-brand-orange'
                  }`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>

            {/* Instagram Social Icon */}
            <div className="mt-2 sm:mt-4">
              <Link
                href="#"
                className={`inline-flex transition-colors ${
                  isSearchActive ? 'text-white hover:text-zinc-300' : 'text-zinc-700 hover:text-brand-orange'
                }`}
                aria-label="Instagram Link"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 sm:h-7 sm:w-7"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Need help? */}
          <div className="sm:col-span-1 md:col-span-3 flex flex-col gap-3 sm:gap-5">
            <h3
              className={`font-serif text-[18px] sm:text-[22px] md:text-[26px] font-normal ${
                isSearchActive ? 'text-white' : 'text-zinc-900'
              }`}
            >
              Need help?
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-4">
              <li>
                <Link
                  href="#"
                  className={`font-sans text-[13px] sm:text-[15px] font-semibold transition-colors hover:underline ${
                    isSearchActive
                      ? 'text-white/90 hover:text-white'
                      : 'text-zinc-600 hover:text-brand-orange'
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className={`font-sans text-[13px] sm:text-[15px] font-semibold transition-colors hover:underline ${
                    isSearchActive
                      ? 'text-white/90 hover:text-white'
                      : 'text-zinc-600 hover:text-brand-orange'
                  }`}
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Branding Column on the right */}
          <div className="col-span-2 sm:col-span-2 md:col-span-6 flex md:justify-end items-start mt-4 sm:mt-6 md:mt-0">
            <div className="flex items-baseline gap-0.5 select-none">
              <span className="font-sans text-[22px] sm:text-[28px] md:text-[34px] font-black tracking-tight text-brand-orange">
                Aunti
              </span>
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-brand-orange"></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
