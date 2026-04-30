import { useEffect, useRef, useState } from "react";
import { FiUser, FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";

interface UserMenuProps {
  onLogout: () => void;
  onOpenSettings: () => void;
}

const UserMenu = ({ onLogout, onOpenSettings }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          inline-flex items-center gap-2 rounded-full
          border border-slate-700 bg-slate-900/80
          px-3 py-1.5 text-xs font-medium text-slate-200
          hover:bg-slate-800 transition
        "
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
          <FiUser className="text-sm" />
        </span>
        <span className="hidden sm:inline">Account</span>
        <FiChevronDown
          className={`text-[10px] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="
            absolute right-0 mt-2 w-40
            rounded-xl border border-slate-800
            bg-slate-900/95 text-xs text-slate-100 shadow-lg
          "
        >
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenSettings();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-slate-800"
          >
            <FiSettings className="text-sm" />
            <span>Settings</span>
          </button>

          <div className="h-px bg-slate-800" />

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-red-300 hover:bg-red-950/50"
          >
            <FiLogOut className="text-sm" />
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
