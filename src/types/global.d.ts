// Global type declarations for debug utilities

import type { MemoryLeakDetector } from '@/src/lib/debug-utils'

declare global {
  interface Window {
    elegantNotesDebug?: {
      getStorageSize: () => string
      getStorageKeyInfo: (key: string) => {
        exists: boolean
        size: string
        isValid: boolean
        data?: unknown
        error?: string
      }
      backupLocalStorage: (filename?: string) => void
      restoreLocalStorage: (backupData: Record<string, string>) => void
      checkStorageQuota: () => {
        warning: boolean
        percentage: number
        message: string
      }
      validateStoreState: (state: unknown) => {
        isValid: boolean
        errors: string[]
      }
      debugStoreState: () => void
      checkHydrationIssues: () => void
      memoryDetector: MemoryLeakDetector
    }
  }
}

export {}
