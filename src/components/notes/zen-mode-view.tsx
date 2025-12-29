'use client'

import { Download, Minimize } from 'lucide-react'
import { FC, RefObject } from 'react'

interface ZenModeViewProps {
  currentNote:
    | {
        content: string
        title: string
      }
    | undefined
  wordCount: number
  textareaRef: RefObject<HTMLTextAreaElement | null>
  updateNoteContent: (value: string) => void
  setIsZenMode: (value: boolean) => void
  showZenModeToast: (value: boolean) => void
  showAutoSaveToast: () => void
}

export const ZenModeView: FC<ZenModeViewProps> = ({
  currentNote,
  wordCount,
  textareaRef,
  updateNoteContent,
  setIsZenMode,
  showZenModeToast,
  showAutoSaveToast,
}) => {
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
