'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import useDebounced from "@/hooks/useDebounce";
import { useBooks } from "@/hooks/useBooks";

export default function SearchBooks() {
  const [value, setValue] = useState("");
  const { setQuery } = useBooks()
  
  const throttledSearch = useDebounced((value: string) => {
    setQuery(value);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    throttledSearch(event.target.value);
  };

  const handleClick = () => {
    setValue("");
    throttledSearch("");
  }

  return (
    <div className="relative w-full max-w-md m-auto">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />

      <Input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        className="pl-10 pr-10 w-full"
      />

      {value && (
        <button
          onClick={handleClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
