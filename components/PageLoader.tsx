"use client";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-gray-100 overflow-hidden">
        <div className="h-full w-1/2 bg-primary animate-loader-bar rounded-full" />
      </div>

      {/* Center spinner + logo */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-14 h-14">
          {/* Outer ring */}
          <svg className="absolute inset-0 animate-loader-spin" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="3" />
            <path
              d="M28 4 A24 24 0 0 1 52 28"
              stroke="#058554"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {/* Logo icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/favicon.svg" alt="" className="w-6 h-6" />
          </div>
        </div>
        <p
          className="text-sm font-semibold text-gray-400 tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Loading…
        </p>
      </div>
    </div>
  );
}
