import {
  FiClock,
  FiExternalLink,
  FiPlayCircle,
  FiTrendingUp,
} from "react-icons/fi";

type AnalyzedVideo = {
  id: number;
  title: string;
  url: string;
  channelName: string;
  analyzedAt: string;
  status: "completed" | "failed";
  views?: string;
  engagement?: string;
};

const mockVideos: AnalyzedVideo[] = [
  {
    id: 1,
    title: "How to Grow a YouTube Channel in 2025",
    url: "https://www.youtube.com/watch?v=abc123",
    channelName: "Creator Lab",
    analyzedAt: "2025-11-25 14:32",
    status: "completed",
    views: "128K",
    engagement: "6.4%",
  },
  {
    id: 2,
    title: "React + TypeScript Crash Course",
    url: "https://www.youtube.com/watch?v=xyz456",
    channelName: "Dev Studio",
    analyzedAt: "2025-11-24 19:05",
    status: "completed",
    views: "82K",
    engagement: "5.1%",
  },
  {
    id: 3,
    title: "Shorts Performance Review",
    url: "https://www.youtube.com/watch?v=short789",
    channelName: "Channel Insights",
    analyzedAt: "2025-11-22 10:18",
    status: "failed",
  },
];

const Content = () => {
  return (
    <div className="h-full w-full px-6 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-100/5 dark:text-slate-400">
          Content
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Previously analyzed videos
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          This section keeps a history of YouTube video URLs that were analyzed
          earlier. In a full implementation, each entry would be stored in the
          database so you can quickly revisit past results without re-running
          the analysis.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by video title, channel, or URL..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pl-9 text-xs text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              disabled
            />
            <FiPlayCircle className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
          </div>
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
            Search and filtering are part of the future functionality.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {mockVideos.map((video) => (
          <div
            key={video.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
                    {video.title}
                  </h2>
                  {video.status === "completed" ? (
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                      Analyzed
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                      Failed
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {video.channelName}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <FiClock className="text-xs" />
                  <span>Analyzed: {video.analyzedAt}</span>
                </span>
                {video.status === "completed" && (
                  <span className="hidden items-center gap-1 md:inline-flex">
                    <FiTrendingUp className="text-xs" />
                    <span>
                      {video.views} views • {video.engagement} engagement
                    </span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-100/10 dark:text-slate-400">
                  Video URL
                </span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-[11px] text-indigo-500 hover:underline"
                >
                  {video.url}
                </a>
              </div>

              <div className="flex gap-2 text-[11px]">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  disabled
                >
                  <FiTrendingUp className="text-xs" />
                  <span>Open analysis</span>
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  disabled
                >
                  <FiExternalLink className="text-xs" />
                  <span>Open on YouTube</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {mockVideos.length === 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
            No analyzed videos yet. Once you start analyzing YouTube URLs, they
            will appear here as a history you can revisit.
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
