# Aunti | Doula Directory Platform

Aunti is a modern, responsive doula directory web application built using Next.js, TypeScript, and Tailwind CSS. It allows families to find the perfect doula for birth, postpartum, and full spectrum care, filtering by zip code, availability dates, preferred working days, care services, inclusive attributes, sliding scale options, and pricing ranges.

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).

### Installation

1. Clone the repository and navigate to the project directory.
2. Install all dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the local Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

Compile the optimized static and dynamic production bundle:
```bash
npm run build
```

Verify type safety and lint rules pass:
```bash
npm run lint
```

---

## Folder Structure

The project maintains a strict, clean separation of concerns:

```
├── app/
│   ├── api/
│   │   └── doulas/
│   │       └── route.ts       # Next.js API Route Handler (implements backend filtering/latency simulation)
│   ├── globals.css            # Global CSS styles and Tailwind configurations
│   ├── layout.tsx             # Root layout (imports fonts and configures meta-tags)
│   └── page.tsx               # Main client-side container connecting search views & hooks
├── components/
│   ├── DatePicker.tsx         # Custom, responsive popover calendar component
│   ├── Footer.tsx             # Optimized 2-column mobile and premium desktop footer
│   ├── Hero.tsx               # Primary search input card and vector blob layout
│   ├── HowItWorks.tsx         # Interactive accordion detailing how to find a doula
│   ├── Navbar.tsx             # Responsive global navigation bar with mobile toggle menu
│   └── SearchResults.tsx      # Main search layout containing filter sidebar and results grid
├── hooks/
│   └── useDoulas.ts           # Custom React hook encapsulating filtering, resetting, and API state
├── lib/
│   └── mockDoulas.ts          # Mock dataset of doulas with rich metadata
├── public/                    # Static assets (images, icons, favicon)
├── types/
│   └── doula.ts               # Core TypeScript interface definition for the Doula entity
└── tsconfig.json              # TypeScript compilation configurations
```

---

## Architecture & Design Tradeoffs

### State Management: Custom Hook (`useDoulas`) vs. URL Query Strings

During implementation, we chose to encapsulate all search, filter, and fetching logic inside a custom React hook ([useDoulas.ts](file:///c:/Users/SpectreOS/Desktop/Internship/Aunti/hooks/useDoulas.ts)) rather than relying on Next.js URL query strings (via `useSearchParams`).

#### Rationale & Benefits
* **State Cohesion**: Storing filter values (including complex objects, arrays, and numbers) inside local React state simplifies reset actions, updates, and conditional rendering.
* **Network Efficiency**: The custom hook leverages an `AbortController` via a `useRef` to cancel ongoing network requests when the user changes filters rapidly. This prevents race conditions and redundant fetch completions.
* **Component isolation**: By keeping the state out of the Next.js router, we prevent routing side-effects (like layout re-mounts or scroll-to-top behaviors) during filter modifications, leading to a much smoother user experience.

#### Tradeoffs
* **Deep Linking**: The direct consequence of this decision is that users cannot bookmark or share a specific filtered view URL directly. For a directory platform of this scale, prioritizing a fast, fluid, and robust local search experience over shareable URLs was determined to be the optimal trade-off for the initial phase.
