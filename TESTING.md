# Testing Guide for Elegant Notes App

## Overview

This guide provides comprehensive testing procedures for debugging and quality assurance of the Elegant Notes App.

## Prerequisites

```bash
# Install dependencies
pnpm install

# Run linter
pnpm lint

# Build the application
pnpm build

# Run development server
pnpm dev
```

## Manual Testing Checklist

### 1. State Management Tests

#### Test: Create New Note

1. Click "New Note" button in sidebar
2. Verify:
   - [ ] New note appears at top of list
   - [ ] Note is selected automatically
   - [ ] Title shows "Untitled"
   - [ ] Content area is empty
   - [ ] Note appears in localStorage

**Expected localStorage structure:**

```json
{
  "state": {
    "notes": [
      {
        "id": 123456789,
        "title": "Untitled",
        "content": "",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z",
        "starred": false
      }
    ],
    "activeNoteId": 123456789,
    "isSidebarOpen": true,
    "soundEnabled": false
  },
  "version": 0
}
```

#### Test: Edit Note Content

1. Type "Hello World" in textarea
2. Verify:
   - [ ] Text appears immediately (no lag)
   - [ ] updatedAt timestamp changes
   - [ ] localStorage updates automatically
   - [ ] Word count updates
   - [ ] Character count updates

**Debug commands:**

```javascript
// In browser console
window.elegantNotesDebug.debugStoreState()
```

#### Test: Edit Note Title

1. Click on note title in sidebar
2. Type new title
3. Verify:
   - [ ] Title updates in sidebar
   - [ ] Title updates in main toolbar
   - [ ] updatedAt timestamp changes
   - [ ] Change persists in localStorage

#### Test: Star/Unstar Note

1. Click star icon on a note
2. Verify:
   - [ ] Star icon fills/unfills
   - [ ] Toast notification appears
   - [ ] Change persists in localStorage
   - [ ] Star state persists after refresh

#### Test: Delete Note

1. Click delete icon on a note (trash can)
2. Verify:
   - [ ] Note is removed from list
   - [ ] If deleted note was active, next note becomes active
   - [ ] Cannot delete last remaining note
   - [ ] Change persists in localStorage

**Edge case:** Try to delete the only note

- Expected: Note should not be deleted

#### Test: Search Notes

1. Enter text in search box
2. Verify:
   - [ ] Notes filter in real-time
   - [ ] Matches title or content
   - [ ] Case-insensitive search
   - [ ] Empty search shows all notes
   - [ ] "No results" message if no matches

#### Test: Persistence After Refresh

1. Create a note with content "Test persistence"
2. Refresh the page (F5 or Cmd+R)
3. Verify:
   - [ ] Note still exists
   - [ ] Content is intact
   - [ ] Active note is still selected
   - [ ] Sidebar state persists

#### Test: Persistence After Browser Restart

1. Create a note
2. Close browser tab/window
3. Open app again
4. Verify:
   - [ ] Note still exists
   - [ ] All data intact

**Important:** This will NOT work in incognito/private mode!

### 2. Hydration Tests

#### Test: Server-Client Match

1. Hard refresh page (Cmd+Shift+R / Ctrl+Shift+F5)
2. Check browser console
3. Verify:
   - [ ] No hydration warnings
   - [ ] No "Text content did not match" errors
   - [ ] No "Prop did not match" errors

**Common hydration errors to watch for:**

```
Warning: Text content did not match. Server: "..." Client: "..."
Warning: Prop `className` did not match
```

#### Test: Theme Hydration

1. Set theme to dark
2. Refresh page
3. Verify:
   - [ ] No flash of light theme
   - [ ] Theme loads correctly
   - [ ] No hydration warnings

#### Test: HydrationBoundary Component

1. Open React DevTools
2. Navigate to Notes page
3. Verify:
   - [ ] HydrationBoundary shows loading state first
   - [ ] Then renders NotesPage
   - [ ] No flickering or re-renders

### 3. Performance Tests

#### Test: Typing Performance

1. Open Chrome DevTools Performance tab
2. Click Record
3. Type continuously for 10 seconds
4. Stop recording
5. Verify:
   - [ ] No frame drops (keep 60fps)
   - [ ] No long tasks > 50ms
   - [ ] Smooth typing experience

**Expected metrics:**

- Frame rate: 60 FPS
- Input latency: < 16ms
- No jank or stuttering

#### Test: Sound Effects Performance

1. Enable sound effects (volume icon)
2. Type rapidly
3. Verify:
   - [ ] Sound doesn't slow down typing
   - [ ] Sound is throttled (not every keystroke)
   - [ ] No audio glitches or overlaps

**Debug:**
Check `SOUND_THROTTLE_MS` in `src/store/useNotesStore.ts`

#### Test: Large Note Performance

1. Create a note with 10,000+ words
2. Try typing, selecting, scrolling
3. Verify:
   - [ ] No noticeable lag
   - [ ] Smooth scrolling
   - [ ] Quick rendering

**Generate large content:**

```javascript
const largeText = 'word '.repeat(10000)
// Paste into note
```

#### Test: Many Notes Performance

1. Create 100+ notes
2. Scroll through sidebar
3. Search notes
4. Verify:
   - [ ] Smooth scrolling
   - [ ] Quick search results
   - [ ] No memory leaks

**Generate many notes:**

```javascript
// In browser console
for (let i = 0; i < 100; i++) {
  useNotesStore.getState().createNewNote()
}
```

#### Test: Memory Leaks

1. Open Chrome DevTools Memory tab
2. Take heap snapshot (Snapshot 1)
3. Use app for 5-10 minutes (type, create, delete notes)
4. Take another snapshot (Snapshot 2)
5. Compare snapshots
6. Verify:
   - [ ] No significant memory growth
   - [ ] No detached DOM nodes
   - [ ] No retained event listeners

**Using debug utilities:**

```javascript
// Take snapshots
window.elegantNotesDebug.memoryDetector.takeSnapshot('start')
// ... use app ...
window.elegantNotesDebug.memoryDetector.takeSnapshot('after')
window.elegantNotesDebug.memoryDetector.compare('start', 'after')
```

### 4. Styling Tests

#### Test: Dark/Light Theme

1. Click theme toggle button
2. Verify:
   - [ ] Theme changes immediately
   - [ ] All components update colors
   - [ ] Icons change appropriately (moon/sun)
   - [ ] Persists after refresh
   - [ ] No color flashing

**Areas to check:**

- Main background
- Sidebar background
- Text colors
- Note cards
- Buttons and icons
- Search input
- Textarea

#### Test: Responsive Design

Test on different screen sizes:

**Desktop (> 768px):**

- [ ] Sidebar visible by default
- [ ] Wide note area
- [ ] Full toolbar visible

**Tablet (768px):**

- [ ] Sidebar toggleable
- [ ] Note area adjusts
- [ ] Mobile menu appears

**Mobile (< 768px):**

- [ ] Sidebar overlays
- [ ] Mobile-optimized toolbar
- [ ] Touch-friendly buttons
- [ ] Proper spacing

**Test in DevTools:**

1. Open DevTools
2. Click device toolbar (Cmd+Shift+M)
3. Test iPhone, iPad, Desktop sizes

#### Test: Zen Mode

1. Click maximize icon to enter Zen Mode
2. Verify:
   - [ ] Sidebar hidden
   - [ ] Toolbar minimized
   - [ ] Full-screen writing area
   - [ ] Exit button visible
   - [ ] Word count visible
   - [ ] Textarea auto-focused
3. Click minimize to exit
4. Verify:
   - [ ] Returns to normal view
   - [ ] State preserved

### 5. Browser Compatibility Tests

Test in all major browsers:

#### Chrome/Edge

- [ ] All features work
- [ ] No console errors
- [ ] Smooth performance

#### Firefox

- [ ] All features work
- [ ] No console errors
- [ ] Smooth performance

#### Safari

- [ ] All features work
- [ ] No console errors
- [ ] localStorage works
- [ ] Theme switching works

**Known Safari issues to watch:**

- localStorage limits
- CSS compatibility

#### Mobile Browsers

Test on actual devices if possible:

**iOS Safari:**

- [ ] Touch interactions work
- [ ] Keyboard behavior correct
- [ ] No scrolling issues

**Chrome Mobile:**

- [ ] All features work
- [ ] Responsive design correct
- [ ] No performance issues

### 6. Offline Functionality Tests

#### Test: Offline Mode

1. Open app
2. Open DevTools Network tab
3. Set throttling to "Offline"
4. Verify:
   - [ ] App still works
   - [ ] Can create notes
   - [ ] Can edit notes
   - [ ] Can delete notes
   - [ ] Changes persist

**Or use:**

```javascript
// In Service Worker or offline test
navigator.onLine // Should be false
```

#### Test: Initial Load Offline

1. Visit app once (loads assets)
2. Close browser
3. Disconnect internet
4. Open app again
5. Verify:
   - [ ] App loads (if previously cached)
   - [ ] Full functionality works

### 7. Data Integrity Tests

#### Test: localStorage Quota

1. Check storage size:

```javascript
window.elegantNotesDebug.getStorageSize()
window.elegantNotesDebug.checkStorageQuota()
```

2. Create many large notes
3. Verify:
   - [ ] App handles quota gracefully
   - [ ] No data corruption
   - [ ] User is warned when near limit

#### Test: Data Validation

```javascript
// Validate store state
window.elegantNotesDebug.validateStoreState(
  JSON.parse(localStorage.getItem('elegant-notes-storage')).state,
)
```

Verify:

- [ ] All required fields present
- [ ] Data types correct
- [ ] No null/undefined where not expected

#### Test: Data Corruption Recovery

1. Manually corrupt localStorage:

```javascript
localStorage.setItem('elegant-notes-storage', 'invalid json{')
```

2. Refresh page
3. Verify:
   - [ ] App handles gracefully
   - [ ] Shows error or resets
   - [ ] Doesn't crash

**Recovery steps:**

```javascript
// Backup first!
window.elegantNotesDebug.backupLocalStorage()

// Clear corrupted data
localStorage.removeItem('elegant-notes-storage')
location.reload()
```

### 8. Keyboard Shortcuts Tests

#### Test: Save Shortcut (Cmd/Ctrl+S)

1. Edit a note
2. Press Cmd+S (Mac) or Ctrl+S (Windows)
3. Verify:
   - [ ] Default browser save prevented
   - [ ] Toast shows "Auto-saved"
   - [ ] Note is already saved (auto-save)

### 9. Edge Cases Tests

#### Test: Empty Note

1. Create note with no content
2. Verify:
   - [ ] Shows "Empty note" in preview
   - [ ] Word count is 0
   - [ ] Can still edit

#### Test: Very Long Title

1. Enter 200+ character title
2. Verify:
   - [ ] Title truncates in sidebar
   - [ ] Full title in main view
   - [ ] No layout breaks

#### Test: Special Characters

1. Enter special characters: `<>&"'`
2. Verify:
   - [ ] Characters display correctly
   - [ ] No XSS vulnerabilities
   - [ ] No encoding issues

#### Test: Emoji

1. Enter emoji in title and content: 🎉📝✨
2. Verify:
   - [ ] Emoji display correctly
   - [ ] Saved correctly to localStorage
   - [ ] Word count handles emoji

#### Test: Multiple Tabs

1. Open app in two browser tabs
2. Make changes in tab 1
3. Verify in tab 2:
   - [ ] Changes sync (or explain they won't)
   - [ ] No conflicts
   - [ ] Data integrity maintained

**Note:** Currently, changes won't sync between tabs in real-time. Each tab has its own state. Last save wins in localStorage.

#### Test: Date Formatting

1. Create notes on different days
2. Verify date labels:
   - [ ] "Today" for current day
   - [ ] "Yesterday" for previous day
   - [ ] "X days ago" for recent
   - [ ] Full date for older notes

### 10. Accessibility Tests

#### Test: Keyboard Navigation

1. Use only keyboard (Tab, Enter, Arrow keys)
2. Verify:
   - [ ] Can navigate all UI
   - [ ] Can create notes
   - [ ] Can edit notes
   - [ ] Focus indicators visible

#### Test: Screen Reader

1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate app
3. Verify:
   - [ ] All elements announced
   - [ ] Buttons have labels
   - [ ] Form inputs have labels

#### Test: Color Contrast

1. Use browser's color contrast checker
2. Verify:
   - [ ] Text meets WCAG AA (4.5:1)
   - [ ] Large text meets WCAG AA (3:1)
   - [ ] UI elements distinguishable

## Automated Testing (Future)

### Recommended Test Setup

```bash
# Unit tests (Vitest/Jest)
npm install --save-dev vitest @testing-library/react

# E2E tests (Playwright)
npm install --save-dev @playwright/test

# Visual regression (Percy/Chromatic)
npm install --save-dev @percy/cli
```

### Example Unit Tests

```typescript
// src/__tests__/useNotesStore.test.ts
import { renderHook, act } from '@testing-library/react'
import { useNotesStore } from '@/src/store/useNotesStore'

describe('useNotesStore', () => {
  it('should create a new note', () => {
    const { result } = renderHook(() => useNotesStore())

    act(() => {
      result.current.createNewNote()
    })

    expect(result.current.notes).toHaveLength(2) // Including default note
  })

  it('should update note content', () => {
    const { result } = renderHook(() => useNotesStore())

    act(() => {
      result.current.updateNoteContent('Test content')
    })

    expect(result.current.notes[0].content).toBe('Test content')
  })
})
```

### Example E2E Tests

```typescript
// tests/e2e/notes.spec.ts
import { test, expect } from '@playwright/test'

test('should create and edit a note', async ({ page }) => {
  await page.goto('/notes')

  // Create new note
  await page.click('text=New Note')

  // Enter title
  await page.fill('[name="title"]', 'Test Note')

  // Enter content
  await page.fill('textarea', 'This is a test note')

  // Refresh page
  await page.reload()

  // Verify persistence
  await expect(page.locator('text=Test Note')).toBeVisible()
})
```

## Performance Benchmarks

### Target Metrics

| Metric                   | Target  | Maximum |
| ------------------------ | ------- | ------- |
| First Contentful Paint   | < 1.5s  | 2.0s    |
| Largest Contentful Paint | < 2.5s  | 3.0s    |
| Time to Interactive      | < 3.0s  | 4.0s    |
| Total Blocking Time      | < 200ms | 300ms   |
| Cumulative Layout Shift  | < 0.1   | 0.25    |

### Lighthouse Scores

Run Lighthouse audit:

1. Open DevTools
2. Go to Lighthouse tab
3. Select categories
4. Run audit

**Target scores:**

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

## Bug Report Template

When reporting bugs, include:

```markdown
### Bug Description

[Clear description of the issue]

### Steps to Reproduce

1.
2.
3.

### Expected Behavior

[What should happen]

### Actual Behavior

[What actually happens]

### Environment

- Browser: [Chrome 120, Firefox 115, etc.]
- OS: [Windows 11, macOS 14, etc.]
- Screen size: [1920x1080, mobile, etc.]

### Console Errors
```

[Paste any console errors]

````

### Screenshots/Videos
[Attach if applicable]

### localStorage Data
```javascript
// Run in console
window.elegantNotesDebug.debugStoreState()
````

### Additional Context

[Any other relevant information]

```

## Testing Schedule

### Before Each Release
- [ ] Run full manual test suite
- [ ] Check all browsers
- [ ] Test mobile devices
- [ ] Run Lighthouse audit
- [ ] Verify build succeeds
- [ ] Check bundle size

### Weekly
- [ ] Test performance
- [ ] Check memory leaks
- [ ] Review console warnings

### Monthly
- [ ] Full accessibility audit
- [ ] Cross-browser compatibility
- [ ] Mobile device testing

## Conclusion

This testing guide ensures the Elegant Notes App maintains high quality and reliability. Use this checklist before releases and when investigating issues.

For automated testing setup, refer to the framework documentation and example tests above.
```
