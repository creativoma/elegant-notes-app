'use client'

import {
  Calendar,
  ChevronLeftIcon,
  Download,
  FileText,
  Maximize,
  Menu,
  Minimize,
  Moon,
  Plus,
  Search,
  Star,
  Sun,
  Trash2,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { Logo } from '@/src/components/logo'
import { useClientTheme } from '@/src/hooks/useClientTheme'
import { useCommands } from '@/src/hooks/useCommands'
import { useToast } from '@/src/hooks/useToast'
import { cn } from '@/src/lib/utils'
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
    if (isZenMode && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isZenMode, textareaRef, currentNote])

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
      <div className="min-h-screen">
        <div className="relative h-screen bg-white dark:bg-gray-900">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => {
                showAutoSaveToast()
              }}
              className="bg-gray-100 p-2 text-gray-700 transition-all hover:bg-gray-200 sm:hidden dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              title="Save note"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => {
                setIsZenMode(false)
                showZenModeToast(false)
              }}
              className="bg-gray-100 p-2 text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <Minimize size={16} />
            </button>
          </div>

          <div className="absolute right-4 bottom-4 flex items-center gap-2">
            <div className="bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 sm:px-3 dark:bg-gray-800 dark:text-gray-300">
              {wordCount} words
            </div>
          </div>

          <textarea
            ref={textareaRef}
            value={currentNote?.content || ''}
            onChange={(e) => updateNoteContent(e.target.value)}
            placeholder="Let your thoughts flow..."
            className="h-full w-full resize-none border-none bg-white p-4 text-gray-900 placeholder-gray-400 outline-none sm:p-8 md:p-16 lg:p-24 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-600"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '14px',
              lineHeight: '1.7',
            }}
            autoFocus
          />
        </div>
      </div>
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

      <aside
        className={`flex-shrink-0 border-r border-gray-200 bg-gray-50 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
          isSidebarOpen ? 'w-64 md:w-64' : 'w-0'
        } fixed top-0 left-0 z-50 h-full overflow-hidden md:relative md:z-auto`}
      >
        <div className="relative flex h-full w-64 flex-col">
          <div className="relative border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <Link href="/">
                  <ChevronLeftIcon
                    className={cn(
                      'h-4 w-4',
                      theme === 'dark' ? 'text-white' : 'text-accent',
                    )}
                  />
                </Link>
                <Logo
                  className={cn(
                    'text-base md:!text-lg',
                    theme === 'dark' ? 'text-white' : 'text-accent',
                  )}
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 text-gray-500 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            <button
              onClick={createNewNote}
              className="bg-accent hover:bg-accent-hover flex w-full items-center justify-center gap-2 p-2 text-white transition-colors"
            >
              <Plus size={16} />
              <span className="text-sm font-medium">New Note</span>
            </button>
          </div>

          <div className="p-4">
            <div className="relative">
              <Search
                className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400 dark:text-gray-500"
                size={14}
              />
              <input
                type="text"
                placeholder="Search your notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setActiveNote(note.id)}
                  className={`group cursor-pointer p-3 transition-all ${
                    activeNoteId === note.id
                      ? 'border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <input
                      type="text"
                      name="title"
                      value={note.title}
                      onChange={(e) => {
                        e.stopPropagation()
                        updateNoteTitle(note.id, e.target.value)
                      }}
                      className="w-full max-w-[120px] truncate border-none bg-transparent text-sm font-medium outline-none sm:max-w-[163px]"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNote(note.id)
                        }}
                        className="text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const noteToToggle = notes.find(
                            (n) => n.id === note.id,
                          )
                          toggleStar(note.id)
                          // Show toast based on the state it will have after toggle
                          if (noteToToggle) {
                            showStarToast(!noteToToggle.starred)
                          }
                        }}
                        className={`transition-all ${
                          note.starred
                            ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500'
                            : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
                        }`}
                      >
                        <Star
                          size={14}
                          fill={note.starred ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                  </div>

                  <p className="mb-2 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
                    {note.content || 'Empty note'}
                  </p>

                  <div className="flex items-center justify-between text-gray-400 dark:text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={10} />
                      <span className="text-xs">
                        {formatDate(note.updatedAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <FileText size={10} />
                      <span className="text-xs">
                        {note.content.trim() === ''
                          ? 0
                          : note.content.trim().split(/\s+/).length}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-white dark:bg-gray-900">
        <div className="relative flex h-14 items-center justify-between border-b border-gray-200 px-2 sm:px-4 dark:border-gray-700">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <Menu size={18} />
            </button>
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden p-1 text-gray-500 transition-colors hover:bg-gray-100 md:block dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Menu size={18} />
              </button>
            )}
            <div className="flex min-w-0 flex-1 items-center gap-2 pr-2">
              <input
                type="text"
                value={currentNote?.title || ''}
                onChange={(e) =>
                  currentNote && updateNoteTitle(currentNote.id, e.target.value)
                }
                placeholder="Untitled"
                className="!m-0 min-w-0 flex-1 truncate border-none bg-transparent text-sm font-medium outline-none sm:text-base"
              />
              <p className="-mb-0.5 hidden text-xs text-gray-500 sm:block dark:text-gray-400">
                {formatDate(currentNote?.updatedAt || new Date().toISOString())}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                showAutoSaveToast()
              }}
              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700"
              title="Save note"
            >
              <Download size={16} />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-1 transition-colors ${
                soundEnabled
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              title="Writing sounds"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            <button
              onClick={() => {
                setIsZenMode(true)
                showZenModeToast(true)
              }}
              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              title="Zen mode"
            >
              <Maximize size={16} />
            </button>

            <button
              onClick={downloadNote}
              className="hidden p-1 text-gray-500 transition-colors hover:bg-gray-100 sm:block dark:text-gray-400 dark:hover:bg-gray-700"
              title="Download note"
            >
              <Download size={16} />
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              title="Change theme"
              disabled={!mounted}
            >
              {mounted && theme === 'dark' ? (
                <Sun size={16} />
              ) : (
                <Moon size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={currentNote?.content || ''}
            onChange={(e) => updateNoteContent(e.target.value)}
            placeholder="Start writing your story..."
            className="h-full w-full resize-none border-none bg-white p-3 text-gray-900 placeholder-gray-400 outline-none sm:p-6 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-600"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '14px',
              lineHeight: '1.7',
            }}
            autoFocus
          />

          <div className="absolute right-2 bottom-2 flex items-center gap-2 bg-gray-100 px-2 py-1 text-xs text-gray-600 sm:right-4 sm:bottom-4 sm:gap-3 sm:px-3 dark:bg-gray-800 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <FileText size={10} className="hidden sm:block" />
              <span className="text-xs sm:text-sm">{wordCount}w</span>
            </div>
            <div className="hidden h-3 w-px bg-gray-300 sm:block dark:bg-gray-600" />
            <span className="hidden text-xs sm:block sm:text-sm">
              {charCount} characters
            </span>
          </div>
        </div>
      </main>
    </motion.div>
  )
}
