import { useEffect, useState } from "react";
import { FiSliders, FiMoon, FiGlobe, FiDatabase } from "react-icons/fi";

type LayoutDensity = "comfortable" | "compact";

type UserSettings = {
  autoOpenAnalyticsOnUrl: boolean;
  rememberLastPage: boolean;
  layoutDensity: LayoutDensity;
};

const SETTINGS_STORAGE_KEY = "yt-dashboard-settings";

const getInitialSettings = (): UserSettings => {
  if (typeof window === "undefined") {
    return {
      autoOpenAnalyticsOnUrl: true,
      rememberLastPage: true,
      layoutDensity: "comfortable",
    };
  }

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return {
        autoOpenAnalyticsOnUrl: true,
        rememberLastPage: true,
        layoutDensity: "comfortable",
      };
    }
    const parsed = JSON.parse(raw) as Partial<UserSettings>;
    return {
      autoOpenAnalyticsOnUrl: parsed.autoOpenAnalyticsOnUrl ?? true,
      rememberLastPage: parsed.rememberLastPage ?? true,
      layoutDensity: parsed.layoutDensity ?? "comfortable",
    };
  } catch {
    return {
      autoOpenAnalyticsOnUrl: true,
      rememberLastPage: true,
      layoutDensity: "comfortable",
    };
  }
};

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>(() =>
    getInitialSettings()
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = (key: keyof UserSettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const setLayoutDensity = (value: LayoutDensity) => {
    setSettings((prev) => ({
      ...prev,
      layoutDensity: value,
    }));
  };

  const renderToggle = (value: boolean) => (
    <button
      type="button"
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
        value ? "bg-emerald-500" : "bg-slate-500"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
          value ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div className="h-full w-full px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:bg-slate-100/5 dark:text-slate-400">
          Settings
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Personalize your dashboard experience
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Adjust how the YouTube analysis dashboard behaves and looks. These
          options affect only your local experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-slate-100/10">
              <FiSliders className="text-slate-700 dark:text-slate-100" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                General preferences
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Control how navigation and behavior work for you.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              <div className="pr-3">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-100">
                  Auto-open Analytics for YouTube URLs
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  When you paste a YouTube URL in the top search, switch to
                  Analytics automatically.
                </p>
              </div>
              <div
                onClick={() => toggle("autoOpenAnalyticsOnUrl")}
                className="cursor-pointer"
              >
                {renderToggle(settings.autoOpenAnalyticsOnUrl)}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
              <div className="pr-3">
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-100">
                  Remember last page
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Re-open the last section you were on when you return.
                </p>
              </div>
              <div
                onClick={() => toggle("rememberLastPage")}
                className="cursor-pointer"
              >
                {renderToggle(settings.rememberLastPage)}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-slate-100/10">
              <FiMoon className="text-slate-700 dark:text-slate-100" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Layout & appearance
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Choose how dense the dashboard feels.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Layout density
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutDensity("comfortable")}
                  className={`flex-1 rounded-xl border px-3 py-2 text-[11px] font-semibold transition ${
                    settings.layoutDensity === "comfortable"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  Comfortable
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">
                    More spacing and relaxed padding.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutDensity("compact")}
                  className={`flex-1 rounded-xl border px-3 py-2 text-[11px] font-semibold transition ${
                    settings.layoutDensity === "compact"
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-300 bg-slate-50 text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200"
                  }`}
                >
                  Compact
                  <span className="block text-[10px] font-normal text-slate-500 dark:text-slate-400">
                    Tighter spacing to fit more on screen.
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-slate-100/10">
              <FiGlobe className="text-slate-700 dark:text-slate-100" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Region & time
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Align analytics with your local context (demo only).
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Time zone
              </label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                defaultValue="local"
                disabled
              >
                <option value="local">Use device time (default)</option>
                <option value="utc">UTC</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Week start
              </label>
              <select
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                defaultValue="monday"
                disabled
              >
                <option value="monday">Monday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900/5 dark:bg-slate-100/10">
              <FiDatabase className="text-slate-700 dark:text-slate-100" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                Data & privacy
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Understand how this demo handles your inputs.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-100">
                Public data only
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                This prototype is designed to work only with publicly available
                YouTube metadata and does not persist any private credentials.
              </p>
            </div>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-[11px] leading-relaxed text-slate-600 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-300">
              In a production setup, you would be able to clear cached analyses,
              export reports, or control retention policies from here.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
