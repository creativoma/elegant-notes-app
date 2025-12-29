import { useEffect } from 'react'
import { toast } from 'sonner'

import { useNotesStore } from '@/src/store/useNotesStore'

export function useCommands() {
  const { notes, activeNoteId, isZenMode } = useNotesStore()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault()
        if (!isZenMode) {
          toast.success('Note saved', {
            description: 'Your changes have been saved automatically',
            duration: 1500,
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [notes, activeNoteId, isZenMode])
}
