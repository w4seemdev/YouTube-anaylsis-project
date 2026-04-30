const Overview = () => {
  return (
    <div className="h-full w-full px-6 py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300">
          Overview
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          YouTube Video Analysis Dashboard
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          This Dashboard enables in-depth analysis of any YouTube video by
          simply pasting its URL. For each video, it derives key KPIs including
          views, watch time, engagement rate, and growth signals and presents
          them as clear, interactive charts to support fast, data-driven
          decisions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)]">
        <section className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              What this system does
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              The system collects and processes channel- and video-level data,
              then computes key performance metrics to highlight what
              differentiates high-performing content from everything else.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Core metrics
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• Views and total watch time</li>
                <li>• Engagement rate (likes & comments per view)</li>
                <li>• Subscriber growth over time</li>
                <li>• Retention & interaction patterns</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Content analysis
              </h3>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• Topic classification for each video</li>
                <li>• Basic sentiment around content themes</li>
                <li>• Clustering to compare similar creators</li>
              </ul>
            </div>
          </div>

          {/* <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
            The goal is not just to show numbers, but to surface patterns: which
            topics, formats, and timings are consistently linked to higher
            visibility and stronger engagement.
          </div> */}
        </section>

        <section className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              How it works
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              The system leverages the YouTube Data API (and the YouTube
              Analytics API where permitted) to programmatically ingest public
              channel and video metadata.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>
                • API responses are transformed into clean, analysis-ready
                tables.
              </li>
              <li>
                • KPIs and content-type labels (educational vs entertainment)
                are computed on the server.
              </li>
              <li>• The client renders interactive charts for exploration.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Who this is for
            </h2>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li>• Creators who want to improve their content strategy.</li>
              <li>• Teams optimizing upload schedules and formats.</li>
              <li>• Stakeholders who need evidence-based decisions.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Overview;
