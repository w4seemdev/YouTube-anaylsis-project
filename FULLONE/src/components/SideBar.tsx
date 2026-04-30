import {
  FiHome,
  FiBarChart2,
  FiFolder,
  FiSettings,
  FiEdit3,
} from "react-icons/fi";
import type { PageKey } from "../App";

interface SidebarProps {
  activePage: PageKey;
  onChangePage: (page: PageKey) => void;
}

const Sidebar = ({ activePage, onChangePage }: SidebarProps) => {
  const baseBtn =
    "w-full rounded-xl px-3 py-2 text-left text-[11px] font-medium transition flex items-center gap-2";

  const makeClasses = (page: PageKey) =>
    page === activePage
      ? `${baseBtn} bg-slate-800 text-slate-50 border border-slate-600`
      : `${baseBtn} text-slate-400 hover:bg-slate-900 hover:text-slate-100 border border-transparent`;

  return (
    <div className="flex h-full flex-col px-4 py-4 text-xs text-slate-200 bg-slate-950">
      <div className="mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Navigation
        </p>
      </div>

      <div className="space-y-2">
        <button
          className={makeClasses("overview")}
          onClick={() => onChangePage("overview")}
        >
          <FiHome className="text-[13px]" />
          <span>Overview</span>
        </button>

        <button
          className={makeClasses("analytics")}
          onClick={() => onChangePage("analytics")}
        >
          <FiBarChart2 className="text-[13px]" />
          <span>Analytics</span>
        </button>

        <button
          className={makeClasses("content")}
          onClick={() => onChangePage("content")}
        >
          <FiFolder className="text-[13px]" />
          <span>Content</span>
        </button>

        <button
          className={makeClasses("manual")}
          onClick={() => onChangePage("manual")}
        >
          <FiEdit3 className="text-[13px]" />
          <span>Manual score</span>
        </button>

        <button
          className={makeClasses("settings")}
          onClick={() => onChangePage("settings")}
        >
          <FiSettings className="text-[13px]" />
          <span>Settings</span>
        </button>
      </div>

      <div className="mt-auto space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">
            About this dashboard
          </p>
          <h3 className="mt-1 text-sm font-semibold text-slate-50">
            Smart insights in one place
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            A simple YouTube analytics workspace that keeps your key metrics,
            manual scores, and content history together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
