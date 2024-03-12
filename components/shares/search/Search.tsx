"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({
  placeholder,
  setSearchValue,
}: {
  placeholder: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
    setSearchValue(term);
  }, 1000);

  return (
    <div className="flex max-lg:text-sm max-md:text-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="rounded-md border border-gray-200 py-[9px] pl-2 text-sm outline-2 placeholder:text-gray-500 max-lg:text-sm max-md:py-1 max-md:text-xs"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </div>
  );
}
