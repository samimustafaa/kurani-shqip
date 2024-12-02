import React from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [debouncedValue] = useDebounce(searchTerm, 500);

  React.useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          className="w-full px-4 py-3 pl-12 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm"
          placeholder="Kërko vargje të Kuranit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
}