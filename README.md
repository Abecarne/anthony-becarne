## Personal Portfolio (React + Vite)

Single-page portfolio built with React, TypeScript, Tailwind CSS, and Vite. All sections (hero, work, experience, education, contact) render on one page using hooks and data from `public/data.json`.

### Prerequisites

- Node.js >= 18
- npm (or pnpm / yarn) installed

### Install & Run

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:5173](http://localhost:5173). Save changes under `src/` to see instant reloads.

### Production Build

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project and outputs the static site to `dist/`. `npm run preview` serves that build locally for final verification.
