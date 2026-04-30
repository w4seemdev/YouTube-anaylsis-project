import Logo from "./Logo";
import SearchInput from "./SearchInput";
import UserMenu from "./userMenu";

interface NavbarProps {
  onSearch: (value: string) => void;
  onLogout: () => void;
  onOpenSettings: () => void;
}

const Navbar = ({ onSearch, onLogout, onOpenSettings }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between gap-6 px-6">
      <Logo />

      <div className="flex-1 max-w-2xl">
        <SearchInput onSearch={onSearch} />
      </div>
      <UserMenu onLogout={onLogout} onOpenSettings={onOpenSettings} />
    </nav>
  );
};

export default Navbar;
