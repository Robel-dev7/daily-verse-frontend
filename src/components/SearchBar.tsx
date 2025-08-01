import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, translation: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search scriptures...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [translation, setTranslation] = useState('kjv');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), translation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 md:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm md:text-base"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-slate-400" />
        </div>
        
        <div className="flex space-x-2">
          <select
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="px-3 md:px-4 py-2 md:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm md:text-base min-w-0 flex-shrink-0"
          >
            <option value="kjv">KJV</option>
            <option value="niv">NIV</option>
            <option value="esv">ESV</option>
            <option value="nlt">NLT</option>
            <option value="amharic1954">አማርኛ 1954</option>
            <option value="amharic-new">አዲሱ መደበኛ ትርጉም</option>
          </select>
        
          <button
            type="submit"
            className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-sm md:text-base whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;