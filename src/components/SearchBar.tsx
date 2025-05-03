import { useDebounce } from '../hooks/useDebounce';
import { useEffect } from 'react';
import { IoSearch } from 'react-icons/io5';  // Import the search icon

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  debounceDelay?: number;
  placeholder?: string;
}

export const SearchBar = ({  searchTerm,  onSearchChange,  debounceDelay = 300,  placeholder = "Search projects..."}: SearchBarProps) => {
  const debouncedSearchTerm = useDebounce(searchTerm, debounceDelay);

  useEffect(() => {
    // Use the debounce
    if (debouncedSearchTerm !== searchTerm) {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="mb-6 relative">
      {/* Search icon inside input */}
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <IoSearch size={20} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
