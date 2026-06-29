export default function SiteLoading() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-background px-6 pt-24">
      <div aria-hidden className="page-loading-lines" />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 shadow-[0_18px_50px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
          <div className="absolute inset-2 rounded-xl border border-indigo-300/40" />
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600 dark:border-indigo-400/25 dark:border-t-indigo-300" />
        </div>

        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600 dark:text-indigo-300">
          Loading SobalTech
        </p>
      </div>
    </div>
  );
}
