/* eslint-disable no-console */
/**
 * Debug Utilities for Elegant Notes App
 *
 * This file contains utility functions for debugging state management,
 * localStorage, and performance issues in development.
 *
 * Console statements and some unused vars are intentional for debugging.
 */

/**
 * Get the current size of localStorage in KB
 */
export function getLocalStorageSize(): string {
  if (typeof window === 'undefined' || !window.localStorage) {
    return '0 KB (localStorage not available)'
  }

  let total = 0
  try {
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += localStorage[key].length + key.length
      }
    }
    return `${(total / 1024).toFixed(2)} KB`
  } catch (error) {
    console.error('Error calculating localStorage size:', error)
    return 'Error'
  }
}

/**
 * Get detailed information about a specific localStorage key
 */
export function getStorageKeyInfo(key: string): {
  exists: boolean
  size: string
  isValid: boolean
  data?: unknown
  error?: string
} {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      exists: false,
      size: '0 KB',
      isValid: false,
      error: 'localStorage not available',
    }
  }

  try {
    const data = localStorage.getItem(key)
    if (!data) {
      return { exists: false, size: '0 KB', isValid: false }
    }

    const size = `${(data.length / 1024).toFixed(2)} KB`

    try {
      const parsed = JSON.parse(data)
      return { exists: true, size, isValid: true, data: parsed }
    } catch {
      return {
        exists: true,
        size,
        isValid: false,
        error: 'Invalid JSON',
      }
    }
  } catch (error) {
    return {
      exists: false,
      size: '0 KB',
      isValid: false,
      error: String(error),
    }
  }
}

/**
 * Backup localStorage data to a downloadable file
 */
export function backupLocalStorage(filename?: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.error('localStorage not available')
    return
  }

  try {
    const backup: Record<string, string> = {}
    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        backup[key] = localStorage[key]
      }
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download =
      filename || `elegant-notes-backup-${new Date().toISOString()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    console.log('Backup created successfully')
  } catch (error) {
    console.error('Error creating backup:', error)
  }
}

/**
 * Restore localStorage from a backup object
 */
export function restoreLocalStorage(backupData: Record<string, string>): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.error('localStorage not available')
    return
  }

  try {
    for (const key in backupData) {
      localStorage.setItem(key, backupData[key])
    }
    console.log('Backup restored successfully')
  } catch (error) {
    console.error('Error restoring backup:', error)
  }
}

/**
 * Check if localStorage is approaching quota limit
 * Returns warning percentage (e.g., 0.8 = 80% full)
 */
export function checkStorageQuota(): {
  warning: boolean
  percentage: number
  message: string
} {
  if (typeof window === 'undefined' || !window.localStorage) {
    return {
      warning: false,
      percentage: 0,
      message: 'localStorage not available',
    }
  }

  try {
    const data = localStorage.getItem('elegant-notes-storage')
    const size = data ? data.length : 0
    const limitBytes = 5 * 1024 * 1024 // 5MB typical limit
    const percentage = size / limitBytes

    if (percentage > 0.9) {
      return {
        warning: true,
        percentage,
        message: `Storage is ${(percentage * 100).toFixed(1)}% full. Consider archiving old notes.`,
      }
    } else if (percentage > 0.8) {
      return {
        warning: true,
        percentage,
        message: `Storage is ${(percentage * 100).toFixed(1)}% full. Getting close to limit.`,
      }
    }

    return {
      warning: false,
      percentage,
      message: `Storage is ${(percentage * 100).toFixed(1)}% full.`,
    }
  } catch {
    return {
      warning: true,
      percentage: 1,
      message: 'Error checking storage quota',
    }
  }
}

/**
 * Log performance metrics for a component render
 */
export function logRenderPerformance(
  componentName: string,
  dependencies?: unknown[],
): void {
  if (process.env.NODE_ENV !== 'development') return

  console.log(`[Performance] ${componentName} rendered`, {
    timestamp: new Date().toISOString(),
    dependencies,
  })
}

/**
 * Validate Zustand store state structure
 */
export function validateStoreState(state: unknown): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (!state || typeof state !== 'object') {
    errors.push('State is not an object')
    return { isValid: false, errors }
  }

  const stateObj = state as Record<string, unknown>

  // Check for required fields
  const requiredFields = ['notes', 'activeNoteId']
  for (const field of requiredFields) {
    if (!(field in stateObj)) {
      errors.push(`Missing required field: ${field}`)
    }
  }

  // Validate notes array
  if ('notes' in stateObj) {
    if (!Array.isArray(stateObj.notes)) {
      errors.push('notes must be an array')
    } else {
      // Validate each note
      stateObj.notes.forEach((note, index) => {
        if (!note || typeof note !== 'object') {
          errors.push(`Note at index ${index} is not an object`)
          return
        }

        const noteObj = note as Record<string, unknown>
        const requiredNoteFields = [
          'id',
          'title',
          'content',
          'createdAt',
          'updatedAt',
          'starred',
        ]
        for (const field of requiredNoteFields) {
          if (!(field in noteObj)) {
            errors.push(`Note at index ${index} missing field: ${field}`)
          }
        }
      })
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Debug: Print current store state to console
 */
export function debugStoreState(): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    console.error('localStorage not available')
    return
  }

  const info = getStorageKeyInfo('elegant-notes-storage')
  console.group('🔍 Elegant Notes Store Debug Info')
  console.log('Storage Key:', 'elegant-notes-storage')
  console.log('Exists:', info.exists)
  console.log('Valid JSON:', info.isValid)
  console.log('Size:', info.size)

  if (info.data) {
    console.log('Data:', info.data)

    const validation = validateStoreState(info.data)
    console.log('State Valid:', validation.isValid)
    if (!validation.isValid) {
      console.error('Validation Errors:', validation.errors)
    }
  } else if (info.error) {
    console.error('Error:', info.error)
  }

  const quota = checkStorageQuota()
  console.log('Storage Quota:', quota.message)
  if (quota.warning) {
    console.warn('⚠️ Storage Warning:', quota.message)
  }

  console.groupEnd()
}

/**
 * Check for common hydration issues
 */
export function checkHydrationIssues(): void {
  if (typeof window === 'undefined') {
    console.warn('Cannot check hydration issues on server')
    return
  }

  console.group('🔍 Hydration Check')

  // Check for theme mismatch
  const storedTheme = localStorage.getItem('theme')
  const htmlClass = document.documentElement.className
  console.log('Stored theme:', storedTheme)
  console.log('HTML class:', htmlClass)

  // Check for client-only values in state
  const storeInfo = getStorageKeyInfo('elegant-notes-storage')
  if (storeInfo.data && typeof storeInfo.data === 'object') {
    const state = storeInfo.data as Record<string, unknown>
    if ('activeNoteId' in state && state.activeNoteId === null) {
      console.warn('⚠️ activeNoteId is null, may cause hydration issues')
    }
  }

  console.groupEnd()
}

/**
 * Memory leak detector - tracks object counts
 */
export class MemoryLeakDetector {
  private snapshots: Map<string, number> = new Map()

  takeSnapshot(label: string): void {
    if (typeof window === 'undefined' || !window.performance) {
      console.warn('Performance API not available')
      return
    }

    // Check if memory API is available (Chrome-specific)
    const performance = window.performance as Performance & {
      memory?: {
        usedJSHeapSize: number
        totalJSHeapSize: number
        jsHeapSizeLimit: number
      }
    }

    if (performance.memory) {
      this.snapshots.set(label, performance.memory.usedJSHeapSize)
      console.log(
        `📸 Memory snapshot "${label}":`,
        `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      )
    } else {
      console.warn('Memory API not available in this browser (Chrome-only)')
    }
  }

  compare(label1: string, label2: string): void {
    const snapshot1 = this.snapshots.get(label1)
    const snapshot2 = this.snapshots.get(label2)

    if (!snapshot1 || !snapshot2) {
      console.error('Snapshots not found')
      return
    }

    const diff = snapshot2 - snapshot1
    const diffMB = diff / 1024 / 1024

    console.group(`📊 Memory Comparison: ${label1} → ${label2}`)
    console.log(`${label1}:`, `${(snapshot1 / 1024 / 1024).toFixed(2)} MB`)
    console.log(`${label2}:`, `${(snapshot2 / 1024 / 1024).toFixed(2)} MB`)
    console.log(
      `Difference:`,
      `${diffMB > 0 ? '+' : ''}${diffMB.toFixed(2)} MB`,
    )

    if (diffMB > 10) {
      console.warn(
        '⚠️ Significant memory increase detected! Possible memory leak.',
      )
    }

    console.groupEnd()
  }

  reset(): void {
    this.snapshots.clear()
  }
}

// Export singleton instance
export const memoryDetector = new MemoryLeakDetector()

/**
 * Add these functions to window object for easy console access in development
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.elegantNotesDebug = {
    getStorageSize: getLocalStorageSize,
    getStorageKeyInfo,
    backupLocalStorage,
    restoreLocalStorage,
    checkStorageQuota,
    validateStoreState,
    debugStoreState,
    checkHydrationIssues,
    memoryDetector,
  }

  console.log('🔧 Debug utilities available via window.elegantNotesDebug')
}
