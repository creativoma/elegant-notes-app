'use client'

import {
  Calendar,
  ChevronLeftIcon,
  FileText,
  Plus,
  Search,
  Star,
  Trash2,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

import { Logo } from '@/src/components/logo'
import { cn } from '@/src/lib/utils'

interface Note {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
  starred: boolean
}

interface NotesSidebarProps {
  isSidebarOpen: boolean
  theme: string | undefined
  searchTerm: string
  filteredNotes: Note[]
  activeNoteId: number | null
  setIsSidebarOpen: (value: boolean) => void
  setSearchTerm: (term: string) => void
  createNewNote: () => void
  setActiveNote: (id: number) => void
  updateNoteTitle: (id: number, title: string) => void
  deleteNote: (id: number) => void
  toggleStar: (id: number) => void
  showStarToast: (isStarred: boolean) => void
  formatDate: (dateString: string) => string
}

export const NotesSidebar: FC<NotesSidebarProps> = ({
  isSidebarOpen,
  theme,
  searchTerm,
  filteredNotes,
  activeNoteId,
  setIsSidebarOpen,
  setSearchTerm,
  createNewNote,
  setActiveNote,
  updateNoteTitle,
  deleteNote,
  toggleStar,
  showStarToast,
  formatDate,
}) => {
  return (
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
                        toggleStar(note.id)
                        showStarToast(!note.starred)
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
  )
}
