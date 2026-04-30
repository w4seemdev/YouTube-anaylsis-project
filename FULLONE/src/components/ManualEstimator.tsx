import { useState, type FormEvent } from "react";
import {
  FiActivity,
  FiEdit3,
  FiFlag,
  FiHash,
  FiType,
  FiGlobe,
} from "react-icons/fi";

type VideoForm = {
  title: string;
  country: string;
  description: string;
  language: string;
  tagsNum: number;
};

type ScoreLabel = "Low" | "Medium" | "High";

type ScoreResult = {
  score: number;
  label: ScoreLabel;
  summary: string;
  tips: string[];
};

const defaultForm: VideoForm = {
  title: "",
  country: "JO",
  description: "",
  language: "ar",
  tagsNum: 10,
};

function estimateSuccess(form: VideoForm): ScoreResult {
  let score = 50;
  const tips: string[] = [];

  const titleLength = form.title.trim().length;
  const descriptionLength = form.description.trim().length;

  if (!titleLength) {
    score -= 10;
    tips.push("Add a clear, descriptive title that reflects the main value.");
  } else if (titleLength < 25) {
    tips.push(
      "Make the title slightly longer (25–70 characters) for better clarity."
    );
  } else if (titleLength <= 70) {
    score += 15;
  } else {
    score -= 5;
    tips.push(
      "Try to shorten the title a bit; very long titles can reduce click-through."
    );
  }

  if (!descriptionLength) {
    score -= 10;
    tips.push(
      "Write a short description that explains why someone should watch."
    );
  } else if (descriptionLength < 80) {
    score += 2;
    tips.push(
      "Consider adding a bit more context and keywords in the description."
    );
  } else if (descriptionLength <= 300) {
    score += 10;
  } else {
    score += 3;
  }

  if (form.tagsNum <= 0) {
    score -= 10;
    tips.push("Add relevant tags so YouTube can understand your topic.");
  } else if (form.tagsNum < 5) {
    tips.push("Using 5–15 focused tags is usually a healthy range.");
  } else if (form.tagsNum <= 15) {
    score += 12;
  } else {
    score += 5;
    tips.push("Avoid too many tags; keep only the most relevant keywords.");
  }

  if (form.country) score += 3;
  if (form.language) score += 3;

  score = Math.max(0, Math.min(100, score));

  let label: ScoreLabel;
  if (score >= 75) label = "High";
  else if (score >= 45) label = "Medium";
  else label = "Low";

  if (!tips.length) {
    tips.push(
      "Looks solid overall. Next focus on thumbnail, hook, and publish timing."
    );
  }

  const summary = `Estimated success potential: ${label} (${score}/100).`;

  return { score, label, summary, tips };
}

const ManualEstimator = () => {
  const [form, setForm] = useState<VideoForm>(defaultForm);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleChange =
    (field: keyof VideoForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value =
        field === "tagsNum" ? Number(e.target.value) || 0 : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value as unknown }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const r = estimateSuccess(form);
    setResult(r);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResult(null);
  };

  const scoreColor =
    result?.label === "High"
      ? "text-emerald-400"
      : result?.label === "Medium"
      ? "text-amber-300"
      : "text-red-400";

  const badgeColor =
    result?.label === "High"
      ? "bg-emerald-500/10 text-emerald-400"
      : result?.label === "Medium"
      ? "bg-amber-500/10 text-amber-300"
      : "bg-red-500/10 text-red-400";

  return (
    <div className="h-full w-full px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
          Manual scoring
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Estimate a video’s success manually
        </h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Fill in the basic video details (title, country, language,
          description, tags). We’ll generate a simple heuristic score that
          approximates the video’s potential performance.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-lg shadow-black/30"
        >
          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <FiType className="text-slate-300" />
              Video title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="Enter your video idea title here"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2 text-xs">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <FiFlag className="text-slate-300" />
                Target country
              </label>
              <input
                type="text"
                value={form.country}
                onChange={handleChange("country")}
                placeholder="JO, US, SA..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                <FiGlobe className="text-slate-300" />
                Video language
              </label>
              <select
                value={form.language}
                onChange={handleChange("language")}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
              >
                <option value="ar">Arabic (ar)</option>
                <option value="en">English (en)</option>
                <option value="fr">French (fr)</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <FiEdit3 className="text-slate-300" />
              Description
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              placeholder="Write a brief description: what the video is about, who the audience is, and the main value for the viewer"
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-100 outline-none placeholder:text-slate-500 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              <FiHash className="text-slate-300" />
              Number of tags
            </label>
            <input
              type="number"
              min={0}
              max={50}
              value={form.tagsNum}
              onChange={handleChange("tagsNum")}
              className="
    w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2
    text-xs text-slate-100 outline-none
    focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400
    [appearance:textfield]
    [&::-webkit-outer-spin-button]:appearance-none
    [&::-webkit-inner-spin-button]:appearance-none
  "
            />
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px]">
            <button
              type="button"
              onClick={handleReset}
              className="text-slate-400 hover:text-slate-200"
            >
              Reset form
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-4 py-1.5 text-[11px] font-semibold text-slate-950 hover:bg-emerald-400"
            >
              <FiActivity className="text-sm" />
              Calculate success score
            </button>
          </div>
        </form>

        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-5 text-xs shadow-lg shadow-black/30">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Estimated success
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-50">
                {result ? result.summary : "Fill in the form and run a score."}
              </p>
            </div>

            {result && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${badgeColor}`}
              >
                {result.label}
              </span>
            )}
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            {result && (
              <>
                <span className={`text-3xl font-bold ${scoreColor}`}>
                  {result.score}
                </span>
                <span className="text-[11px] uppercase tracking-wide text-slate-500">
                  /100 score
                </span>
              </>
            )}
            {!result && (
              <p className="text-[11px] text-slate-500">
                No score yet. Once you submit, you&apos;ll see a numeric score,
                label, and concrete tips here.
              </p>
            )}
          </div>

          {result && (
            <div className="mt-3 space-y-1.5">
              <p className="text-[11px] font-semibold text-slate-300">
                Suggestions to improve:
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside">
                {result.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 p-3 text-[10px] text-slate-500">
            This is a heuristic score based only on the metadata you enter
            (title, description, language, tags). Real performance will also
            depend on thumbnail, audience fit, topic timing, and watch
            retention.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEstimator;
