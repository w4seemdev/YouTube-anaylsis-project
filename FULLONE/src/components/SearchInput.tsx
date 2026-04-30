import { type FormEvent, useState } from "react";
// import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchText: string) => void;
  placeholder?: string;
  defaultValue?: string;
}

const SearchInput = ({
  onSearch,
  placeholder = "",
  defaultValue = "",
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full rounded-full bg-slate-800/80 border border-slate-700 pl-9 pr-20 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={placeholder}
        />

        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
