'use client'

import {
  Download,
  FileText,
  Maximize,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { FC, RefObject } from 'react'

interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  starred: boolean
}

interface NotesEditorProps {
  currentNote: Note | undefined
  wordCount: number
  charCount: number
  isSidebarOpen: boolean
  soundEnabled: boolean
  theme: string | undefined
  mounted: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
  setIsSidebarOpen: (value: boolean) => void
  updateNoteTitle: (id: number, title: string) => void
  updateNoteContent: (content: string) => void
  setSoundEnabled: (value: boolean) => void
  setIsZenMode: (value: boolean) => void
  showZenModeToast: (isEnabled: boolean) => void
  showAutoSaveToast: () => void
  downloadNote: () => void
  setTheme: (theme: string) => void
  formatDate: (dateString: string) => string
}

export const NotesEditor: FC<NotesEditorProps> = ({
  currentNote,
  wordCount,
  charCount,
  isSidebarOpen,
  soundEnabled,
  theme,
  mounted,
  textareaRef,
  setIsSidebarOpen,
  updateNoteTitle,
  updateNoteContent,
  setSoundEnabled,
  setIsZenMode,
  showZenModeToast,
  showAutoSaveToast,
  downloadNote,
  setTheme,
  formatDate,
}) => {
  return (
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
  )
}
