export default function HomeLoading() {
  return (
    <div className="flex h-full min-h-screen flex-col bg-[#f8f8f8]">
      
      {/* ── HEADER SKELETON ── */}
      <div className="sticky top-0 z-40 bg-[#f8f8f8] pb-2">
        <div className="h-[env(safe-area-inset-top)] bg-[#5F30CA] opacity-80" />
        <div className="rounded-b-[2.1rem] bg-[#5F30CA] px-5 pb-8 pt-3.5 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-2.5 w-2/3">
              {/* Prefix skeleton */}
              <div className="h-4 w-20 rounded bg-white/20" />
              {/* Time title skeleton */}
              <div className="h-9 w-40 rounded-lg bg-white/30" />
              {/* Location header skeleton */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-4 w-32 rounded bg-white/20" />
              </div>
            </div>
            {/* Avatar skeleton */}
            <div className="h-12 w-12 mt-4 rounded-full bg-white/25" />
          </div>
        </div>
      </div>

      <div className="min-h-0 space-y-6">

        {/* ── QUICK ACTIONS SKELETON ── */}
        <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
          {/* Schedule Action Skeleton */}
          <div 
            className="rounded-[1.25rem] bg-gradient-to-br from-purple-100 to-purple-50 p-4 border border-purple-100/50 animate-pulse flex flex-col justify-between"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            <div className="h-9 w-9 rounded-full bg-purple-200/50" />
            <div className="space-y-2 mt-2">
              <div className="h-4 w-3/4 rounded bg-purple-200/60" />
              <div className="h-3 w-1/2 rounded bg-purple-200/40" />
            </div>
          </div>

          {/* Instant Action Skeleton */}
          <div 
            className="rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-indigo-50 p-4 border border-indigo-100/50 animate-pulse flex flex-col justify-between"
            style={{ aspectRatio: "1.45 / 1" }}
          >
            <div className="h-6 w-16 rounded-full bg-indigo-200/50" />
            <div className="space-y-2 mt-2">
              <div className="h-4 w-3/4 rounded bg-indigo-200/60" />
              <div className="h-3 w-1/2 rounded bg-indigo-200/40" />
            </div>
          </div>
        </div>

        {/* ── SERVICES SECTION SKELETON ── */}
        <div className="px-4 pt-4 animate-pulse">
          <div className="flex items-center justify-between">
            {/* Title skeleton */}
            <div className="h-7 w-32 rounded bg-gray-200" />
            {/* View All skeleton */}
            <div className="h-5 w-16 rounded bg-gray-200" />
          </div>

          {/* Grid skeleton */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="overflow-hidden rounded-xl border border-gray-100 bg-white"
              >
                {/* Image placeholder */}
                <div className="relative aspect-3/2 w-full bg-gray-100" />
                {/* Text placeholders */}
                <div className="p-3 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW TO BOOK SKELETON ── */}
        <div className="px-4 pb-8 pt-4 animate-pulse">
          {/* Title skeleton */}
          <div className="h-7 w-36 rounded bg-gray-200" />
          {/* Banner skeleton */}
          <div className="mt-4 h-36 w-full rounded-[1.25rem] bg-gray-200" />
        </div>

      </div>
    </div>
  );
}
