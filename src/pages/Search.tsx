import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, BookOpen, MessageSquare } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState('kjv');
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Mock search results
  const mockResults = {
    faith: [
      {
        text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
        reference: "Hebrews 11:1",
        book: "Hebrews",
        chapter: 11,
        verse: 1
      },
      {
        text: "So then faith cometh by hearing, and hearing by the word of God.",
        reference: "Romans 10:17",
        book: "Romans",
        chapter: 10,
        verse: 17
      }
    ],
    love: [
      {
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        reference: "John 3:16",
        book: "John",
        chapter: 3,
        verse: 16
      },
      {
        text: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.",
        reference: "1 John 4:7",
        book: "1 John",
        chapter: 4,
        verse: 7
      }
    ],
    hope: [
      {
        text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
        reference: "Jeremiah 29:11",
        book: "Jeremiah",
        chapter: 29,
        verse: 11
      }
    ]
  };

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const searchResults = mockResults[searchQuery.toLowerCase() as keyof typeof mockResults] || [];
      setResults(searchResults);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleVerseClick = (verse: any) => {
    navigate(`/verse/${translation}/${verse.book}/${verse.chapter}/${verse.verse}`);
  };

  const handleReadChapter = (verse: any) => {
    navigate(`/chapter/${translation}/${verse.book}/${verse.chapter}`);
  };

  const handleCommentary = (verse: any) => {
    navigate(`/commentary/matthew-henry/${verse.book}/${verse.chapter}/${verse.verse}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Search Scripture
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Find verses by keyword, topic, or phrase across different translations
          </p>
        </div>

        <div className="mb-6 sm:mb-8">
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Translation
          </label>
          <select
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="kjv">King James Version (KJV)</option>
            <option value="niv">New International Version (NIV)</option>
            <option value="amharic1954">አማርኛ 1954</option>
            <option value="amharic-new">አዲሱ መደበኛ ትርጉም</option>
          </select>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <SearchIcon className="w-8 h-8 text-blue-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            <div className="text-sm text-gray-600 mb-4">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </div>
            {results.map((verse, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow">
                <blockquote 
                  className="text-base sm:text-lg leading-relaxed text-gray-800 mb-3 sm:mb-4 font-serif cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => handleVerseClick(verse)}
                >
                  "{verse.text}"
                </blockquote>
                <cite className="block text-sm sm:text-base font-semibold text-blue-600 mb-3 sm:mb-4">
                  {verse.reference}
                </cite>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    onClick={() => handleVerseClick(verse)}
                    className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <SearchIcon className="w-4 h-4" />
                    View Verse
                  </button>
                  <button
                    onClick={() => handleReadChapter(verse)}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Chapter
                  </button>
                  <button
                    onClick={() => handleCommentary(verse)}
                    className="flex items-center justify-center gap-2 bg-amber-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Commentary
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try searching for different keywords like "faith", "love", or "hope"
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <SearchIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">
              Enter a keyword, topic, or phrase to find relevant Bible verses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;