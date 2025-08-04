import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  starred: boolean
}

interface NotesState {
  notes: Note[]
  activeNoteId: number | null
  searchTerm: string
  isSidebarOpen: boolean
  isZenMode: boolean
  soundEnabled: boolean
  createNewNote: () => void
  updateNoteContent: (content: string) => void
  updateNoteTitle: (id: number, title: string) => void
  toggleStar: (id: number) => void
  deleteNote: (id: number) => void
  setActiveNote: (id: number) => void
  setSearchTerm: (term: string) => void
  setIsSidebarOpen: (value: boolean) => void
  setIsZenMode: (value: boolean) => void
  setSoundEnabled: (value: boolean) => void
}

let audioInstance: HTMLAudioElement | null = null
let lastSoundTime = 0
const SOUND_THROTTLE_MS = 50 // Minimum time between sounds

const playKeyPressSound = () => {
  const now = Date.now()

  if (now - lastSoundTime < SOUND_THROTTLE_MS) {
    return
  }

  try {
    if (!audioInstance) {
      audioInstance = new Audio('/key-press.mp3')
      audioInstance.volume = 1
      audioInstance.preload = 'auto'
    }

    if (!audioInstance.paused) {
      audioInstance.currentTime = 0
    }

    audioInstance.play().catch(() => {
      audioInstance = null
    })

    lastSoundTime = now
  } catch (error) {
    audioInstance = null
  }
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [
        {
          id: 1,
          title: 'Welcome to Notes',
          content:
            'This is your new elegant notes application. Start writing your ideas here...\n\nFeatures:\n• Dark/light mode\n• Zen mode for concentration\n• Smart search\n• Favorites\n• Note export',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          starred: true,
        },
      ],
      activeNoteId: 1,
      searchTerm: '',
      isSidebarOpen: true,
      isZenMode: false,
      soundEnabled: false,

      createNewNote: () => {
        const newNote: Note = {
          id: Date.now(),
          title: 'Untitled',
          content: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          starred: false,
        }
        set((state) => ({
          notes: [newNote, ...state.notes],
          activeNoteId: newNote.id,
        }))
      },

      updateNoteContent: (content: string) => {
        const { notes, activeNoteId, soundEnabled } = get()
        const currentNote = notes.find((note) => note.id === activeNoteId)

        // Play sound with improved handling
        if (soundEnabled && currentNote && content !== currentNote.content) {
          playKeyPressSound()
        }

        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === state.activeNoteId
              ? { ...note, content, updatedAt: new Date().toISOString() }
              : note,
          ),
        }))
      },

      updateNoteTitle: (id: number, title: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, title, updatedAt: new Date().toISOString() }
              : note,
          ),
        }))
      },

      toggleStar: (id: number) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, starred: !note.starred } : note,
          ),
        }))
      },

      deleteNote: (id: number) => {
        set((state) => {
          if (state.notes.length <= 1) return state
          const newNotes = state.notes.filter((note) => note.id !== id)
          let newActiveNoteId = state.activeNoteId
          if (state.activeNoteId === id) {
            newActiveNoteId = newNotes[0]?.id || null
          }
          return {
            notes: newNotes,
            activeNoteId: newActiveNoteId,
          }
        })
      },

      setActiveNote: (id: number) => set({ activeNoteId: id }),
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
      setIsZenMode: (value: boolean) => set({ isZenMode: value }),
      setSoundEnabled: (value: boolean) => set({ soundEnabled: value }),
    }),
    {
      name: 'elegant-notes-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ['notes', 'activeNoteId', 'isSidebarOpen', 'soundEnabled'].includes(
              key,
            ),
          ),
        ),
    },
  ),
)
