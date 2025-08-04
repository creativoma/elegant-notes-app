'use client'

import {
  Calendar,
  Download,
  Edit3,
  FileText,
  Maximize,
  Moon,
  Plus,
  Search,
  Shield,
  Star,
  Trash2,
  Users,
  Volume2,
} from 'lucide-react'
import React, { FC, Suspense } from 'react'

import { NotesLoading } from '@/src/components/notes-loading'
import { cn } from '@/src/lib/utils'

interface NotesVizualizerProps {
  className?: string
}

export const NotesVizualizer: FC<NotesVizualizerProps> = ({ className }) => {
  return (
    <Suspense fallback={<NotesLoading />}>
      <div className={cn('relative mx-auto w-5xl', className)}>
        <div className="overflow-hidden border border-gray-200 bg-white shadow-2xl">
          <div className="flex h-10 items-center border-b border-gray-200 bg-gray-50 px-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm font-medium text-gray-600">
              Elegant Notes App
            </div>
          </div>

          <div className="flex h-[570px]">
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <div className="flex h-full w-full flex-col">
                <div className="border-b border-gray-200 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 p-1">
                        <Edit3 size={16} className="text-blue-600" />
                      </div>
                      <h1 className="text-lg font-semibold text-gray-900">
                        Notes
                      </h1>
                    </div>
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 bg-blue-600 px-3 py-2 text-white transition-colors hover:bg-blue-700">
                    <Plus size={16} />
                    <span className="text-sm font-medium">New Note</span>
                  </button>
                </div>

                <div className="p-4">
                  <div className="relative">
                    <Search
                      className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
                      size={14}
                    />
                    <input
                      type="text"
                      placeholder="Search your notes..."
                      className="w-full border border-gray-200 bg-white py-2 pr-3 pl-9 text-sm text-gray-900 placeholder-gray-500"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-2">
                    <div className="border-l-2 border-blue-500 bg-blue-50 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          Project Ideas
                        </div>
                        <div className="flex items-center gap-2">
                          <Trash2 size={12} className="text-gray-400" />
                          <Star
                            size={12}
                            className="text-blue-600"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                      <p className="mb-2 line-clamp-2 text-xs text-gray-600">
                        Some ideas for new projects and features to implement...
                      </p>
                      <div className="flex items-center justify-between text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          <span className="text-xs">Today</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={10} />
                          <span className="text-xs">42</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 hover:bg-gray-100">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          Meeting Notes
                        </div>
                        <div className="flex items-center gap-2">
                          <Trash2
                            size={12}
                            className="text-gray-400 opacity-0"
                          />
                          <Star size={12} className="text-gray-400" />
                        </div>
                      </div>
                      <p className="mb-2 text-xs text-gray-600">
                        Weekly team sync meeting discussion points...
                      </p>
                      <div className="flex items-center justify-between text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          <span className="text-xs">Yesterday</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={10} />
                          <span className="text-xs">156</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 hover:bg-gray-100">
                      <div className="mb-1 flex items-center justify-between">
                        <div className="text-sm font-medium text-gray-900">
                          Task List
                        </div>
                        <div className="flex items-center gap-2">
                          <Trash2
                            size={12}
                            className="text-gray-400 opacity-0"
                          />
                          <Star size={12} className="text-gray-400" />
                        </div>
                      </div>
                      <p className="mb-2 text-xs text-gray-600">
                        Important tasks and deadlines to remember...
                      </p>
                      <div className="flex items-center justify-between text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          <span className="text-xs">2 days ago</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText size={10} />
                          <span className="text-xs">89</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col bg-white">
              <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-medium text-gray-900">
                      Project Ideas
                    </h2>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-blue-600" />
                  <Maximize size={16} className="text-gray-500" />
                  <Download size={16} className="text-gray-500" />
                  <Moon size={16} className="text-gray-500" />
                </div>
              </div>

              <div className="relative flex-1 p-6">
                <div className="space-y-4 text-gray-700">
                  <div className="h-4 w-full bg-gray-200"></div>
                  <div className="h-4 w-5/6 bg-gray-200"></div>
                  <div className="h-4 w-4/5 bg-gray-200"></div>
                  <div className="h-4 w-3/4 bg-gray-200"></div>
                  <div className="h-4 w-full bg-gray-200"></div>
                  <div className="h-4 w-2/3 bg-gray-200"></div>
                  <div className="h-4 w-5/6 bg-gray-200"></div>
                  <div className="h-4 w-1/2 bg-gray-200"></div>
                </div>

                <div className="absolute right-4 bottom-4 flex items-center gap-3 bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <FileText size={12} />
                    <span>42 words</span>
                  </div>
                  <div className="h-3 w-px bg-gray-300" />
                  <span>234 characters</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 border border-gray-200 bg-white p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Users size={16} className="text-blue-600" />
            <span className="font-medium text-gray-900">1,247</span>
            <span className="text-gray-500">active users</span>
          </div>
        </div>

        <div className="absolute -bottom-4 -left-4 border border-gray-200 bg-white p-3 shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            <Shield size={16} className="text-blue-600" />
            <span className="font-medium text-gray-900">100%</span>
            <span className="text-gray-500">private and secure</span>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
