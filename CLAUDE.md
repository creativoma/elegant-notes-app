# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production (static export)
pnpm lint         # Run ESLint checks
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format code with Prettier
pnpm check        # Run format:check + lint (validation only)
pnpm fix          # Format + lint:fix (auto-fix everything)
```

Node version 22 is required (see .nvmrc).

## Architecture Overview

**Tech Stack:** Next.js 16 with React 19, TypeScript, Tailwind CSS, Zustand for state management. Static export only (no API routes or server-side rendering).

**State Management:** Single Zustand store in `src/store/useNotesStore.ts` manages all app state including notes array, active note selection, sidebar/zen mode toggles, and sound preferences. Uses localStorage persistence middleware for selective state hydration.

**Note Structure:**

```typescript
interface Note {
  id: number // Unix timestamp
  title: string
  content: string
  createdAt: string // ISO date
  updatedAt: string // ISO date
  starred: boolean
}
```

## Key Directories

- `src/app/` - Next.js app router pages
- `src/components/notes/` - Notes editor, sidebar, zen mode components
- `src/hooks/` - Custom hooks (useToast, useCommands, useClientTheme)
- `src/store/` - Zustand store with localStorage persistence
- `src/lib/` - Utilities including `cn()` for Tailwind class merging

## Code Style

- ESLint with Next.js and TypeScript plugins, Prettier integration
- Import ordering: alphabetical, separated groups (react → external → internal → relative)
- Unused variables must be prefixed with `_`
- Tailwind CSS for all styling with dark mode via `.dark` class
- Client components marked with `'use client'` directive

## App Characteristics

- Offline-first: works without network, all data in browser localStorage
- Privacy-focused: no tracking or external data transmission
- Zen mode: distraction-free writing that hides notifications
