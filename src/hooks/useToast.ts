import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { useNotesStore } from '@/src/store/useNotesStore'

export function useToast() {
  const { notes, activeNoteId, isZenMode } = useNotesStore()

  const prevNotesCount = useRef(notes.length)
  const prevActiveNoteId = useRef(activeNoteId)
  const isInitialMount = useRef(true)
  const lastToastTime = useRef(0)
  const lastCreatedNoteId = useRef<number | null>(null)

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      prevNotesCount.current = notes.length
      prevActiveNoteId.current = activeNoteId
      return
    }

    if (isZenMode) return

    const now = Date.now()
    const hasLengthChanged = notes.length !== prevNotesCount.current

    // Only show toasts when the length actually changed, not just when notes array updates
    if (!hasLengthChanged) {
      return
    }

    if (notes.length > prevNotesCount.current) {
      if (now - lastToastTime.current > 1000) {
        const newestNote = notes[0]
        if (newestNote && newestNote.id !== lastCreatedNoteId.current) {
          toast.success('New note created', {
            description: 'Start writing your ideas',
            duration: 2000,
          })
          lastToastTime.current = now
          lastCreatedNoteId.current = newestNote.id
        }
      }
    } else if (notes.length < prevNotesCount.current) {
      if (now - lastToastTime.current > 1000) {
        toast.success('Note deleted', {
          description: 'Note has been removed successfully',
          duration: 2000,
        })
        lastToastTime.current = now
      }
    }

    prevNotesCount.current = notes.length
    // eslint-disable-next-line react-hooks/exhaustive-deps -- activeNoteId only used for initialization
  }, [notes, isZenMode])

  useEffect(() => {
    if (isInitialMount.current) return

    if (isZenMode) return

    const now = Date.now()

    if (activeNoteId !== prevActiveNoteId.current && activeNoteId !== null) {
      const isRecentlyCreated =
        lastCreatedNoteId.current === activeNoteId &&
        now - lastToastTime.current < 2000

      if (!isRecentlyCreated && now - lastToastTime.current > 500) {
        const activeNote = notes.find((note) => note.id === activeNoteId)
        if (activeNote) {
          toast('Note selected', {
            description: activeNote.title || 'Untitled',
            duration: 1500,
          })
          lastToastTime.current = now
        }
      }
    }

    prevActiveNoteId.current = activeNoteId
  }, [activeNoteId, notes, isZenMode])

  const showAutoSaveToast = () => {
    if (!isZenMode) {
      toast.success('Auto-saved', {
        description: 'Note saved to local storage',
        duration: 1200,
      })
    }
  }

  const showStarToast = (isStarred: boolean) => {
    if (!isZenMode) {
      toast.success(
        isStarred ? 'Added to favorites' : 'Removed from favorites',
        {
          description: isStarred
            ? 'Note has been marked as favorite'
            : 'Note has been removed from favorites',
          duration: 1500,
        },
      )
    }
  }

  const showDownloadToast = (fileName: string) => {
    if (!isZenMode) {
      toast.success('Note downloaded', {
        description: `${fileName} has been downloaded successfully`,
        duration: 2000,
      })
    }
  }

  const showZenModeToast = (isEntering: boolean) => {
    toast(isEntering ? 'Zen mode enabled' : 'Zen mode disabled', {
      description: isEntering
        ? 'Focus on your writing without distractions'
        : 'You have returned to normal view',
      duration: 1500,
    })
  }

  return {
    showAutoSaveToast,
    showStarToast,
    showDownloadToast,
    showZenModeToast,
  }
}
