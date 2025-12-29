# Changelog

## [0.1.9] - 2025-12-29

### Changed

- **Major Framework Updates:**
  - Update Next.js from 15.5.7 to 16.1.1 with ESLint configuration migration
  - Update React from 19.2.1 to 19.2.3 and React DOM from 19.2.1 to 19.2.3
  - Update @types/node from 22.19.1 to 25.0.3

- **Development Dependencies:**
  - Update TypeScript ESLint from 8.48.1 to 8.50.1
  - Update ESLint from 9.39.1 to 9.39.2
  - Update Prettier Tailwind plugin from 0.6.14 to 0.7.2

- **UI & Styling Dependencies:**
  - Update Tailwind CSS from 4.1.17 to 4.1.18
  - Update @tailwindcss/postcss from 4.1.17 to 4.1.18
  - Update Lucide React icons from 0.525.0 to 0.562.0
  - Update Motion (Framer Motion) from 12.23.25 to 12.23.26

### Migration

- **ESLint Configuration:**
  - Migrated from legacy `.eslintrc.json` to modern `eslint.config.mjs` (flat config format)
  - Updated lint scripts from `next lint` to `eslint .` (Next.js 16 breaking change)
  - Added @eslint/eslintrc dependency for compatibility

- **Code Quality:**
  - Added explanatory comments for ESLint disable directives in hydration boundaries
  - Fixed React hooks linting for intentional hydration patterns in HydrationBoundary and useClientTheme

## [0.1.8] - 2025-12-29

### Fixed

- Fix Google Fonts build failure - Replaced `next/font/google` with system font fallbacks (Georgia, -apple-system, BlinkMacSystemFont) to eliminate network dependencies during build and align with offline-first design
- Fix package.json import warning - Changed header.tsx to use default import for Next.js 16 compatibility

### Added

- Add comprehensive debugging infrastructure with browser console utilities (`window.elegantNotesDebug`) for localStorage inspection, state validation, quota monitoring, backup/restore, and memory leak detection
- Add DEBUGGING.md - Complete investigation workflows for state management, hydration errors, performance, data loss, and build issues
- Add TESTING.md - Manual test procedures, performance benchmarks, browser compatibility matrix, and automated test examples
- Add TypeScript declarations for debug utilities in `src/types/global.d.ts`

### Security

- Implement safe property access via `Object.prototype.hasOwnProperty.call()`
- Add browser compatibility checks for Chrome-specific APIs
- Zero CodeQL vulnerabilities verified

## [0.1.7] - 2025-12-29

### Changed

- Validate codebase compliance with Feature Development Specialist guidelines - Comprehensive assessment confirming full compliance with all architectural and implementation guidelines including technology stack, privacy-first approach, TypeScript type safety, minimalist philosophy, offline capability, responsive design, code quality standards, state management patterns, and localStorage data structure. No code changes required as codebase already meets all requirements.

## [0.1.6] - 2025-12-29

### Added

- Auto-focus on note body textarea - When entering a note, creating a new note, or switching between notes, the textarea automatically receives focus, eliminating the need for an unnecessary click before starting to write. This feature works in both normal mode and Zen mode.

## [0.1.5] - 2025-12-06

### Changed

- Update ESLint configuration and dependencies - Migrated to flat config format (eslint.config.mjs) with improved TypeScript and React support, updated dependencies to latest versions

## [0.1.4] - 2025-08-05

### Fixed

- Fix right padding for note title input container

## [0.1.3] - 2025-08-05

### Added

- Add note title input focus handling
- Add web version in home page

## [0.1.2] - 2025-08-04

### Fixed

- Fix chevron without return link home - Adds missing home return functionality to chevron icon, improving navigation consistency and user experience

### Chore

- Add changelog entry for version 0.1.2 - Documents the recent updates and fixes in the changelog for better project tracking

## [0.1.1] - 2025-08-04

### Fixed

- Fix date calculation showing negative days - Fixed a bug in the `formatDate` function where newly created notes were showing "-1 days ago" instead of "Today". The issue was in the conditional logic that calculated the difference between dates - when `diffDays` was 1 (indicating today), the condition `diffDays <= 7` would execute `${diffDays - 1} days ago`, resulting in "0 days ago" or "-1 days ago". The fix changes the first condition from `diffDays === 1` to `diffDays <= 1` to properly handle same-day notes and edge cases with fractional day differences.

## [0.1.0] - 2025-08-04

### Added

- Initial release
- Core note-taking functionality
- Local storage persistence
- Responsive design
- Dark/light theme support
- Search functionality
- Privacy-focused approach
- Modern UI with smooth animations
- Distraction-free writing experience
- Intuitive note organization
- Mark favorite notes functionality
- Smart search capabilities
- Zen mode for focused writing
- Auto-save functionality
- Export notes as text files
- Writing sounds feature
