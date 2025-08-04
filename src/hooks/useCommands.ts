import { useEffect } from 'react'

import { useNotesStore } from '@/src/store/useNotesStore'

import { useToast } from './useToast'

export function useCommands() {
  const { notes, activeNoteId } = useNotesStore()
  const { showSavedToast } = useToast()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        showSavedToast()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [notes, activeNoteId, showSavedToast])
}
