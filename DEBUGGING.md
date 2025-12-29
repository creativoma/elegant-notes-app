# Debugging and Investigation Guide for Elegant Notes App

## Overview

This guide provides comprehensive debugging workflows, common issues, and resolution strategies for the Elegant Notes App - a Next.js 15 application with React 19, TypeScript, Zustand state management, and Tailwind CSS 4.

## Quick Reference

### Diagnostic Commands

```bash
# Check for code quality issues
pnpm lint

# Build the application (production mode)
pnpm build

# Run development server
pnpm dev

# Fix formatting and linting issues
pnpm fix
```

### Browser DevTools Checklist

1. **Console Tab**: Check for errors, warnings, and failed network requests
2. **Application Tab**: Inspect localStorage data under `elegant-notes-storage`
3. **Network Tab**: Monitor API calls and resource loading
4. **Performance Tab**: Profile rendering performance
5. **React DevTools**: Inspect component tree and state

## Investigation Workflow

When encountering an issue, follow this systematic approach:

### 1. Reproduce the Issue

- Document exact steps to reproduce
- Note browser version and device type
- Check if issue occurs in incognito/private mode
- Test across multiple browsers (Chrome, Firefox, Safari, Edge)

### 2. Check Browser Console

```javascript
// Open browser console (F12 or Cmd+Option+I)
// Look for:
// - Red errors (critical issues)
// - Yellow warnings (potential problems)
// - Failed network requests
// - Hydration mismatches
```

### 3. Inspect localStorage

```javascript
// Check localStorage in browser console
localStorage.getItem('elegant-notes-storage')

// Check localStorage size
JSON.stringify(localStorage).length

// Clear localStorage (use cautiously - will delete all notes!)
localStorage.clear()
```

### 4. Examine Zustand Store

```javascript
// Access store state in console (only works in development)
// The store is not exposed globally by default
// Use React DevTools to inspect component state instead
```

### 5. Review Build Output

```bash
# Build the app to check for errors
pnpm build

# Look for:
# - TypeScript errors
# - Next.js compilation errors
# - Webpack bundle size warnings
```

## Common Issue Categories

### 1. State Management Issues

#### Issue: Notes Not Persisting Across Sessions

**Symptoms:**

- Notes disappear after page refresh
- Changes to notes are lost

**Diagnosis:**

```javascript
// Check if localStorage is available
if (typeof window !== 'undefined' && window.localStorage) {
  console.log('localStorage available')
  console.log('Current data:', localStorage.getItem('elegant-notes-storage'))
} else {
  console.error('localStorage not available')
}
```

**Root Causes:**

- Browser in private/incognito mode (localStorage is cleared on exit)
- localStorage quota exceeded (typically 5-10MB)
- Browser security settings blocking localStorage
- Corrupted localStorage data

**Solutions:**

1. Check browser mode (exit private browsing)
2. Clear old data to free up space
3. Enable localStorage in browser settings
4. Clear corrupted data and reinitialize:

```javascript
// Backup existing data first!
const backup = localStorage.getItem('elegant-notes-storage')
console.log('Backup:', backup)

// Clear and reload
localStorage.removeItem('elegant-notes-storage')
location.reload()
```

#### Issue: Zustand State Not Syncing with localStorage

**Symptoms:**

- State updates in UI but doesn't persist
- localStorage shows old data

**Diagnosis:**
Check the Zustand middleware configuration in `src/store/useNotesStore.ts`:

```typescript
// Verify partialize function is correct
partialize: (state) =>
  Object.fromEntries(
    Object.entries(state).filter(([key]) =>
      ['notes', 'activeNoteId', 'isSidebarOpen', 'soundEnabled'].includes(key),
    ),
  ),
```

**Solutions:**

- Ensure persisted keys match state properties
- Verify `createJSONStorage` is using localStorage correctly
- Check for serialization errors in stored data

#### Issue: State Updates Causing Unnecessary Re-renders

**Symptoms:**

- Typing feels sluggish
- UI freezes during interaction
- High CPU usage

**Diagnosis:**

```javascript
// Use React DevTools Profiler
// Enable "Record why each component rendered"
// Type in textarea and check which components re-render
```

**Solutions:**

- Optimize selector usage in components
- Use `useShallow` from Zustand for object selection
- Memoize expensive computations with `useMemo`

### 2. Hydration Errors

#### Issue: Hydration Mismatch Warning

**Symptoms:**

```
Warning: Text content did not match. Server: "X" Client: "Y"
Warning: Prop `className` did not match. Server: "X" Client: "Y"
```

**Root Causes:**

- Using Date.now() or Date() during render (non-deterministic)
- Accessing window/document during SSR
- Theme mismatch between server and client
- Random values generated during render

**Solutions:**

1. **For theme-related mismatches:**

```typescript
// Use HydrationBoundary component (already implemented)
<HydrationBoundary fallback={<NotesLoading />}>
  <NotesPage />
</HydrationBoundary>
```

2. **For date/time rendering:**

```typescript
// Bad: Direct Date() in render
<span>{new Date().toLocaleDateString()}</span>

// Good: Use useEffect to render on client only
const [dateStr, setDateStr] = useState('');
useEffect(() => {
  setDateStr(new Date().toLocaleDateString());
}, []);
<span>{dateStr}</span>
```

3. **For random IDs:**

```typescript
// Bad: Math.random() in render
const id = Math.random()

// Good: Use useId hook
const id = useId()
```

### 3. Performance Issues

#### Issue: Slow Typing/Input Lag

**Symptoms:**

- Delay between keypress and character appearing
- Cursor jumping
- Freezing during typing

**Diagnosis:**

```javascript
// Enable React DevTools Profiler
// Record typing session
// Check:
// - Component render times
// - Number of components rendering
// - Render cause
```

**Root Causes:**

- Sound effects playing on every keystroke
- Excessive state updates
- Large note content causing expensive renders

**Solutions:**

1. **Sound throttling (already implemented):**

```typescript
// Check SOUND_THROTTLE_MS in useNotesStore.ts
const SOUND_THROTTLE_MS = 50 // Adjust if needed
```

2. **Optimize textarea updates:**

```typescript
// Use debouncing for expensive operations
import { useDebouncedCallback } from 'use-debounce'

const debouncedUpdate = useDebouncedCallback(
  (value) => updateNoteContent(value),
  100,
)
```

3. **Check bundle size:**

```bash
pnpm build
# Review .next/build-manifest.json
# Look for large chunks > 200KB
```

#### Issue: Memory Leaks

**Symptoms:**

- Browser tab consuming increasing memory over time
- Application slowing down after extended use
- Browser eventually crashes

**Diagnosis:**

```javascript
// Use Chrome DevTools Memory tab
// 1. Take heap snapshot
// 2. Use app for 5-10 minutes
// 3. Take another snapshot
// 4. Compare and look for:
//    - Detached DOM nodes
//    - Event listeners not cleaned up
//    - Large arrays/objects growing
```

**Root Causes:**

- Audio element not properly cleaned up
- Event listeners not removed in useEffect cleanup
- Large state objects accumulating

**Solutions:**

1. **Check audio cleanup:**

```typescript
// In useNotesStore.ts, ensure audioInstance is properly managed
// Consider adding a cleanup function when component unmounts
```

2. **Verify useEffect cleanup:**

```typescript
useEffect(() => {
  const handler = () => {
    /* ... */
  }
  window.addEventListener('keydown', handler)

  // MUST return cleanup function
  return () => {
    window.removeEventListener('keydown', handler)
  }
}, [])
```

### 4. Styling Issues

#### Issue: Tailwind Classes Not Applying

**Symptoms:**

- Styles missing in production
- JIT classes not generated
- Dark mode not working

**Diagnosis:**

```bash
# Check Tailwind config
# Verify content paths include all component files

# Check if class is in generated CSS
pnpm build
# Inspect .next/static/css files
```

**Solutions:**

1. **Verify Tailwind content configuration:**
   Check `tailwind.config.js` or CSS imports

2. **Use safelist for dynamic classes:**

```javascript
// If using dynamic class names
const className = `text-${color}-500` // BAD - won't be detected

// Use full class names
const className = color === 'red' ? 'text-red-500' : 'text-blue-500' // GOOD
```

#### Issue: Theme Not Switching

**Symptoms:**

- Dark/light mode toggle doesn't work
- Theme reverts on page reload
- Flashing of wrong theme on load

**Diagnosis:**

```javascript
// Check localStorage
localStorage.getItem('theme')

// Check next-themes setup in layout.tsx
// Verify ThemeProvider configuration
```

**Solutions:**

1. **Check ThemeProvider setup:**

```typescript
// Ensure in app/layout.tsx:
<html suppressHydrationWarning>
  <ThemeProvider attribute="class" storageKey="theme" defaultTheme="system">
```

2. **Use client-side theme hook:**

```typescript
// Use useClientTheme hook to prevent hydration issues
const { theme, setTheme, mounted } = useClientTheme()

// Don't render theme-dependent content until mounted
if (!mounted) return null
```

### 5. Data Loss Issues

#### Issue: localStorage Quota Exceeded

**Symptoms:**

```
Error: QuotaExceededError: The quota has been exceeded
```

- Notes stop saving
- Can't create new notes

**Diagnosis:**

```javascript
// Check storage usage
function getStorageSize() {
  let total = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length
    }
  }
  return (total / 1024).toFixed(2) + ' KB'
}
console.log('Storage used:', getStorageSize())

// Typical limit is 5-10MB depending on browser
```

**Solutions:**

1. **Implement storage limit warning:**

```typescript
// Add to useNotesStore.ts
const checkStorageQuota = () => {
  try {
    const test = localStorage.getItem('elegant-notes-storage')
    const size = test ? test.length : 0
    const limitKB = 5000 // 5MB in KB
    if (size > limitKB * 1024 * 0.8) {
      // Warn at 80%
      console.warn('Storage nearly full:', size / 1024, 'KB')
      return false
    }
    return true
  } catch (e) {
    return false
  }
}
```

2. **Archive old notes:**

- Export old notes to files
- Delete archived notes from app
- Keep only active notes in storage

#### Issue: Data Corruption

**Symptoms:**

- App won't load
- Console shows JSON parse errors
- Notes display incorrectly

**Diagnosis:**

```javascript
// Try to parse localStorage data
try {
  const data = JSON.parse(localStorage.getItem('elegant-notes-storage') || '{}')
  console.log('Valid data:', data)
} catch (e) {
  console.error('Corrupted data:', e)
}
```

**Solutions:**

1. **Backup before clearing:**

```javascript
// Copy localStorage data to a file
const backup = localStorage.getItem('elegant-notes-storage')
const blob = new Blob([backup], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'notes-backup-' + Date.now() + '.json'
a.click()
```

2. **Clear and reinitialize:**

```javascript
localStorage.removeItem('elegant-notes-storage')
location.reload()
```

3. **Restore from backup:**

```javascript
// If you have a backup file
const backupData = '...' // paste backup data
localStorage.setItem('elegant-notes-storage', backupData)
location.reload()
```

### 6. Build Issues

#### Issue: Google Fonts Network Error

**Symptoms:**

```
Error: getaddrinfo ENOTFOUND fonts.googleapis.com
Failed to fetch `Inter` from Google Fonts
Failed to fetch `Lora` from Google Fonts
```

**Root Cause:**
Network restrictions preventing access to Google Fonts CDN

**Solutions:**

1. **Use local fonts (recommended for offline-first app):**

```typescript
// In app/layout.tsx, replace Google Fonts with local fonts
import localFont from 'next/font/local'

const lora = localFont({
  src: '../fonts/Lora-Regular.woff2',
  variable: '--font-lora',
  display: 'swap',
})

const inter = localFont({
  src: '../fonts/Inter-Regular.woff2',
  variable: '--font-inter',
  display: 'swap',
})
```

2. **Download fonts and add to public/fonts:**

- Download from Google Fonts
- Place in `/public/fonts/` or `/src/fonts/`
- Update font imports

3. **Use system fonts as fallback:**

```typescript
// Simplified approach - use system fonts
const fontFamily = {
  sans: 'system-ui, -apple-system, sans-serif',
  serif: 'Georgia, Cambria, serif',
}
```

## Testing Procedures

### Manual Testing Checklist

#### State Management

- [ ] Create a new note
- [ ] Edit note content
- [ ] Edit note title
- [ ] Star/unstar a note
- [ ] Delete a note
- [ ] Search for notes
- [ ] Refresh page - verify notes persist
- [ ] Close tab and reopen - verify notes persist
- [ ] Test with 100+ notes for performance

#### Hydration

- [ ] Hard refresh page (Cmd+Shift+R)
- [ ] Check console for hydration warnings
- [ ] Toggle theme and refresh
- [ ] Verify no content flash on load

#### Performance

- [ ] Type continuously for 30 seconds
- [ ] Check CPU usage in Activity Monitor/Task Manager
- [ ] Monitor memory in Chrome DevTools
- [ ] Test with large note (10,000+ words)
- [ ] Enable sound effects and type - check for lag

#### Browser Compatibility

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test on mobile browsers

#### Offline Functionality

- [ ] Disconnect network
- [ ] Create/edit notes
- [ ] Verify changes persist
- [ ] Reconnect and verify functionality

### Automated Testing (Future Enhancement)

Consider adding:

```typescript
// Example test structure
describe('Notes Store', () => {
  it('should persist notes to localStorage', () => {
    // Test localStorage persistence
  })

  it('should handle quota exceeded error', () => {
    // Test error handling
  })
})
```

## Browser DevTools Tips

### Chrome DevTools

1. **Application Tab:**
   - Navigate to Storage > Local Storage
   - View `elegant-notes-storage` key
   - Right-click to edit or delete

2. **Console Tab:**
   - Use `$0` to reference selected element
   - Access React component: `$r` (with React DevTools)

3. **Performance Tab:**
   - Click Record
   - Interact with app
   - Stop recording
   - Analyze flame graph for slow operations

4. **Memory Tab:**
   - Take heap snapshot
   - Use Comparison view to find leaks
   - Look for Detached DOM nodes

### React DevTools

1. **Components Tab:**
   - Inspect component props and state
   - Highlight updates when components render
   - View component source

2. **Profiler Tab:**
   - Record component renders
   - Identify expensive components
   - Check render causes

## Recommendations for Prevention

### Code Quality

1. Enable strict TypeScript mode
2. Use ESLint with recommended rules
3. Add Prettier for consistent formatting
4. Set up pre-commit hooks with Husky

### State Management

1. Keep state normalized (avoid nested objects)
2. Use selectors to access only needed state
3. Implement state migration for schema changes
4. Add validation for persisted state

### Performance

1. Lazy load components with `next/dynamic`
2. Use `React.memo` for expensive pure components
3. Implement virtual scrolling for long lists
4. Monitor bundle size with `@next/bundle-analyzer`

### Error Handling

1. Add error boundaries for graceful degradation
2. Implement try-catch for localStorage operations
3. Log errors to monitoring service (e.g., Sentry)
4. Show user-friendly error messages

### Testing

1. Add unit tests for store actions
2. Add integration tests for key workflows
3. Set up E2E tests with Playwright
4. Implement visual regression testing

## Monitoring and Debugging Tools

### Recommended Tools

1. **React DevTools** - Component inspection
2. **Redux DevTools** - Works with Zustand
3. **Lighthouse** - Performance auditing
4. **Web Vitals** - Core Web Vitals monitoring
5. **Sentry** - Error tracking
6. **LogRocket** - Session replay

### Setting Up Monitoring

```typescript
// Example: Add error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo)
    // Send to monitoring service
  }

  render() {
    return this.props.children
  }
}
```

## Support and Resources

### Documentation

- [Next.js Debugging](https://nextjs.org/docs/debugging)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Getting Help

1. Check browser console for errors
2. Review this debugging guide
3. Search GitHub issues
4. Create detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/OS information
   - Console errors
   - Screenshots/videos

## Conclusion

This guide covers the most common debugging scenarios for the Elegant Notes App. When encountering an issue:

1. Follow the investigation workflow systematically
2. Check the relevant issue category
3. Apply the suggested diagnostic steps
4. Implement the recommended solutions
5. Test thoroughly across browsers
6. Document any new issues discovered

Remember: Always backup user data before making changes that could affect localStorage!
