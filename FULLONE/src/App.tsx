import { useState } from "react";
import Navbar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Main from "./components/MainBody";
import Login from "./Login";

export type PageKey =
  | "overview"
  | "analytics"
  | "content"
  | "settings"
  | "manual";

function App() {
  const [searchText, setSearchText] = useState("");
  const [activePage, setActivePage] = useState<PageKey>("overview");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    const q = value.toLowerCase().trim();
    setSearchText(value);

    if (!q) {
      setActivePage("overview");
      return;
    }

    if (
      q.includes("analytic") ||
      q.includes("analysis") ||
      q.includes("stats") ||
      q.includes("statistics") ||
      q.includes("kpi") ||
      q.includes("metric") ||
      q.includes("metrics") ||
      q.includes("مشاهدات") ||
      q.includes("تحليل") ||
      q.includes("تحليلات") ||
      q.includes("إحصائيات") ||
      q.includes("احصائيات")
    ) {
      setActivePage("analytics");
    } else if (
      q.includes("content") ||
      q.includes("videos") ||
      q.includes("video") ||
      q.includes("history") ||
      q.includes("links") ||
      q.includes("saved") ||
      q.includes("فيديو") ||
      q.includes("فيديوهات") ||
      q.includes("محتوى") ||
      q.includes("روابط")
    ) {
      setActivePage("content");
    } else if (
      q.includes("setting") ||
      q.includes("settings") ||
      q.includes("preferences") ||
      q.includes("options") ||
      q.includes("config") ||
      q.includes("configuration") ||
      q.includes("اعداد") ||
      q.includes("اعدادات") ||
      q.includes("تخصيص")
    ) {
      setActivePage("settings");
    } else if (
      q.includes("overview") ||
      q.includes("dashboard") ||
      q.includes("main") ||
      q.includes("home") ||
      q.includes("start") ||
      q.includes("رئيسية") ||
      q.includes("الرئيسية") ||
      q.includes("داشبورد") ||
      q.includes("ملخص")
    ) {
      setActivePage("overview");
    }
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="
        min-h-screen flex flex-col
        bg-slate-50 text-slate-900
        dark:bg-slate-950 dark:text-slate-100
      "
    >
      <header
        className="
          border-b py-3
          bg-slate-100 border-slate-200
          dark:bg-slate-900/80 dark:border-slate-800 dark:backdrop-blur-md
        "
      >
        <Navbar
          onSearch={handleSearch}
          onLogout={() => setIsLoggedIn(false)}
          onOpenSettings={() => setActivePage("settings")}
        />
      </header>

      <div className="flex flex-1">
        <aside
          className="
            w-64 border-r
            bg-slate-100 border-slate-200
            dark:bg-slate-900/60 dark:border-slate-800
          "
        >
          <Sidebar activePage={activePage} onChangePage={setActivePage} />
        </aside>

        <main className="flex-1 overflow-y-auto">
          <Main searchText={searchText} activePage={activePage} />
        </main>
      </div>
    </div>
  );
}

export default App;
