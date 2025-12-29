'use client'

import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

import { NotesEditor } from '@/src/components/notes/notes-editor'
import { NotesSidebar } from '@/src/components/notes/notes-sidebar'
import { ZenModeView } from '@/src/components/notes/zen-mode-view'
import { useClientTheme } from '@/src/hooks/useClientTheme'
import { useCommands } from '@/src/hooks/useCommands'
import { useToast } from '@/src/hooks/useToast'
import { useNotesStore } from '@/src/store/useNotesStore'

export const NotesPage = () => {
  const { theme, setTheme, mounted } = useClientTheme()
  const {
    notes,
    activeNoteId,
    searchTerm,
    isSidebarOpen,
    isZenMode,
    soundEnabled,
    createNewNote,
    updateNoteContent,
    updateNoteTitle,
    toggleStar,
    deleteNote,
    setActiveNote,
    setSearchTerm,
    setIsSidebarOpen,
    setIsZenMode,
    setSoundEnabled,
  } = useNotesStore()

  useCommands()
  const {
    showStarToast,
    showDownloadToast,
    showZenModeToast,
    showAutoSaveToast,
  } = useToast()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const currentNote = notes.find((note) => note.id === activeNoteId)

  const wordCount =
    currentNote?.content.trim() === ''
      ? 0
      : currentNote?.content.trim().split(/\s+/).length || 0
  const charCount = currentNote?.content.length || 0

  useEffect(() => {
    if (activeNoteId === null && notes.length > 0) {
      setActiveNote(notes[0].id)
    }
  }, [activeNoteId, notes, setActiveNote])

  useEffect(() => {
    if (textareaRef.current) {
      // Focus on Zen mode changes or when activeNoteId changes in normal mode
      const shouldFocus = isZenMode || activeNoteId !== null
      if (shouldFocus) {
        textareaRef.current.focus()
      }
    }
  }, [isZenMode, activeNoteId])

  const downloadNote = () => {
    if (!currentNote) return

    const element = document.createElement('a')
    const file = new Blob([currentNote.content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `${currentNote.title}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    showDownloadToast(`${currentNote.title}.txt`)
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`

    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    })
  }

  if (isZenMode) {
    return (
      <ZenModeView
        currentNote={currentNote}
        wordCount={wordCount}
        textareaRef={textareaRef}
        updateNoteContent={updateNoteContent}
        setIsZenMode={setIsZenMode}
        showZenModeToast={showZenModeToast}
        showAutoSaveToast={showAutoSaveToast}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen"
    >
      {isSidebarOpen && (
        <div
          className="bg-accent/20 fixed inset-0 z-40 transition-all duration-300 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <NotesSidebar
        isSidebarOpen={isSidebarOpen}
        theme={theme}
        searchTerm={searchTerm}
        filteredNotes={filteredNotes}
        activeNoteId={activeNoteId}
        setIsSidebarOpen={setIsSidebarOpen}
        setSearchTerm={setSearchTerm}
        createNewNote={createNewNote}
        setActiveNote={setActiveNote}
        updateNoteTitle={updateNoteTitle}
        deleteNote={deleteNote}
        toggleStar={toggleStar}
        showStarToast={showStarToast}
        formatDate={formatDate}
      />

      <NotesEditor
        currentNote={currentNote}
        wordCount={wordCount}
        charCount={charCount}
        isSidebarOpen={isSidebarOpen}
        soundEnabled={soundEnabled}
        theme={theme}
        mounted={mounted}
        textareaRef={textareaRef}
        setIsSidebarOpen={setIsSidebarOpen}
        updateNoteTitle={updateNoteTitle}
        updateNoteContent={updateNoteContent}
        setSoundEnabled={setSoundEnabled}
        setIsZenMode={setIsZenMode}
        showZenModeToast={showZenModeToast}
        showAutoSaveToast={showAutoSaveToast}
        downloadNote={downloadNote}
        setTheme={setTheme}
        formatDate={formatDate}
      />
    </motion.div>
  )
}
