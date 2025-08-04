'use client'

export const NotesLoading = () => {
  return (
    <div className="flex h-screen min-w-5xl">
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-full w-full flex-col">
          <div className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-5 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
              <div className="h-4 w-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-9 w-full animate-pulse rounded bg-blue-200 dark:bg-blue-800"></div>
          </div>

          <div className="p-4">
            <div className="relative">
              <div className="h-8 w-full animate-pulse rounded border border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`p-3 transition-all ${
                    i === 0
                      ? 'border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                      <div className="h-3 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                    </div>
                  </div>
                  <div className="mb-2 space-y-1">
                    <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                    <div className="h-3 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col bg-white dark:bg-gray-900">
        <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>

        <div className="relative flex-1">
          <div className="h-full w-full p-6">
            <div className="space-y-4">
              <div className="h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="space-y-3">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 flex items-center gap-3 bg-gray-100 px-3 py-1 dark:bg-gray-800">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
              <div className="h-3 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
            </div>
            <div className="h-3 w-px bg-gray-300 dark:bg-gray-600" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-600"></div>
          </div>
        </div>
      </main>
    </div>
  )
}
