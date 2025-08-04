'use client'

import { Suspense } from 'react'

import { NotesPage } from '@/src/app/notes/notes-content'
import { HydrationBoundary } from '@/src/components/hydration-boundary'
import { NotesLoading } from '@/src/components/notes-loading'

export default function Page() {
  return (
    <Suspense fallback={<NotesLoading />}>
      <HydrationBoundary fallback={<NotesLoading />}>
        <NotesPage />
      </HydrationBoundary>
    </Suspense>
  )
}
