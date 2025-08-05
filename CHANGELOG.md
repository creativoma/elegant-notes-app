# Changelog

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
