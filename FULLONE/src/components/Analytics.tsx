import { type FormEvent, useState } from "react";
import {
  FiBarChart2,
  FiPlayCircle,
  FiTrendingUp,
  FiYoutube,
} from "react-icons/fi";

type KpiPoint = {
  label: string;
  value: number;
};

type KpiSeries = {
  id: string;
  label: string;
  unit: string;
  summaryValue: string;
  summaryDelta?: string;
  series: KpiPoint[];
};

type AnalyticsResult = {
  videoTitle: string;
  channelName: string;
  url: string;
  publishedAt: string;
  kpis: KpiSeries[];
};

const mockAnalyticsResponse: AnalyticsResult = {
  videoTitle: "How to Grow a YouTube Channel in 2025",
  channelName: "Creator Lab",
  url: "https://www.youtube.com/watch?v=abc123",
  publishedAt: "2025-11-20",
  kpis: [
    {
      id: "views",
      label: "Views",
      unit: "",
      summaryValue: "128K",
      summaryDelta: "+18% vs last 7 days",
      series: [
        { label: "Day 1", value: 8000 },
        { label: "Day 2", value: 15000 },
        { label: "Day 3", value: 21000 },
        { label: "Day 4", value: 26000 },
        { label: "Day 5", value: 31000 },
        { label: "Day 6", value: 36000 },
        { label: "Day 7", value: 42000 },
      ],
    },
    {
      id: "watch_time",
      label: "Watch time",
      unit: "minutes",
      summaryValue: "32.4K min",
      summaryDelta: "+9% vs baseline",
      series: [
        { label: "Day 1", value: 2500 },
        { label: "Day 2", value: 3400 },
        { label: "Day 3", value: 4200 },
        { label: "Day 4", value: 4700 },
        { label: "Day 5", value: 5200 },
        { label: "Day 6", value: 5600 },
        { label: "Day 7", value: 6000 },
      ],
    },
    {
      id: "engagement",
      label: "Engagement rate",
      unit: "%",
      summaryValue: "6.4%",
      summaryDelta: "+1.2 pts vs channel avg",
      series: [
        { label: "Day 1", value: 4.1 },
        { label: "Day 2", value: 4.8 },
        { label: "Day 3", value: 5.6 },
        { label: "Day 4", value: 6.1 },
        { label: "Day 5", value: 6.4 },
        { label: "Day 6", value: 6.7 },
        { label: "Day 7", value: 6.9 },
      ],
    },
  ],
};

const Analytics = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyticsResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) return;

    setIsLoading(true);

    setTimeout(() => {
      setCurrentUrl(trimmed);
      setResult({
        ...mockAnalyticsResponse,
        url: trimmed,
      });
      setIsLoading(false);
    }, 600);
  };

  const hasResult = !!result;

  return (
    <div className="h-full w-full px-6 py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
          Analytics
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Analyze a YouTube video in one step
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Paste a YouTube video URL and the dashboard will compute key KPIs —
          views, watch time, and engagement — then summarize them as clear,
          focused KPI cards you can quickly scan.
        </p>
      </div>

      {!hasResult ? (
        <div className="flex min-h-[280px] items-center justify-center">
          <div className="w-full max-w-2xl space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <FiPlayCircle className="text-base text-emerald-400" />
              <span>Start by pasting a YouTube video URL to analyze.</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=example"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <FiYoutube className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-red-500" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span></span>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Analyzing..." : "Analyze video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
                  <FiYoutube className="text-lg text-red-500" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-50">
                    {result?.videoTitle || "YouTube video"}
                  </p>
                  <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                    URL: {currentUrl}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste another YouTube URL to analyze..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-3 py-2 text-[11px] font-semibold text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Analyzing..." : "Run"}
                </button>
              </div>
            </div>
          </form>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Video
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {result?.videoTitle}
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                {result?.channelName}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Published
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {result?.publishedAt}
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                Time window and exact timezone can be configured later.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                Views · Watch time · Engagement
              </p>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                KPIs are derived from the JSON response returned by your API.
              </p>
            </div>
          </div>

          {/* KPI cards */}
          <KpiGrid kpis={result?.kpis || []} />
        </div>
      )}
    </div>
  );
};

export default Analytics;

interface KpiGridProps {
  kpis: KpiSeries[];
}

const KpiGrid = ({ kpis }: KpiGridProps) => {
  if (!kpis.length) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
};

const KpiCard = ({ kpi }: { kpi: KpiSeries }) => {
  const lastPoint = kpi.series[kpi.series.length - 1];
  const total = kpi.series.reduce((sum, p) => sum + p.value, 0);
  const avg = total / (kpi.series.length || 1);
  const bestPoint = kpi.series.reduce((best, p) =>
    p.value > best.value ? p : best
  );

  const formatPointValue = (v: number) => {
    if (kpi.unit === "%") return `${v.toFixed(1)}%`;
    if (kpi.unit === "minutes") return `${v.toLocaleString()} min`;
    return v.toLocaleString();
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10">
            {kpi.id === "views" && (
              <FiBarChart2 className="text-sm text-emerald-400" />
            )}
            {kpi.id === "watch_time" && <FiClockIcon />}
            {kpi.id === "engagement" && (
              <FiTrendingUp className="text-sm text-emerald-400" />
            )}
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {kpi.label}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {kpi.summaryValue}
            </p>
          </div>
        </div>
        {kpi.summaryDelta && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
            {kpi.summaryDelta}
          </span>
        )}
      </div>

      <div className="mt-3 space-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <p>
          <span className="text-slate-400 dark:text-slate-500">
            Last period:
          </span>{" "}
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {formatPointValue(lastPoint.value)}{" "}
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            ({lastPoint.label})
          </span>
        </p>
        <p>
          <span className="text-slate-400 dark:text-slate-500">
            Average over window:
          </span>{" "}
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {formatPointValue(avg)}
          </span>
        </p>
        <p>
          <span className="text-slate-400 dark:text-slate-500">
            Best-performing day:
          </span>{" "}
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {bestPoint.label}
          </span>{" "}
          <span className="text-slate-400 dark:text-slate-500">
            ({formatPointValue(bestPoint.value)})
          </span>
        </p>
      </div>
    </div>
  );
};

const FiClockIcon = () => (
  <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      className="stroke-current"
      strokeWidth="1.5"
    />
    <path
      d="M12 7.5V12L15 14"
      className="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
