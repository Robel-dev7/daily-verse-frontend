
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VerseCard from '../components/VerseCard';
import { Calendar, RefreshCw } from 'lucide-react';
import { fetchDailyVerse } from '../utils/api';


type TranslationKey = 'kjv' | 'amharic1954' | 'amharic-new';

interface DailyVerse {
  text: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  translation: string;
  date: string;
}

const Home = () => {
  const [translation, setTranslation] = useState<TranslationKey>('kjv');
  const [dailyVerse, setDailyVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchDailyVerse(translation);
        // The backend returns { reference, text, translation, book, chapter, verse }
        setDailyVerse({
          ...data,
          date: new Date().toLocaleDateString(),
        });
      } catch (error) {
        setDailyVerse(null);
      }
      setLoading(false);
    };
    fetchData();
  }, [translation]);

  const handleTranslationChange = (newTranslation: string) => {
    setTranslation(newTranslation as TranslationKey);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-4">Daily Scripture</h1>
        <p className="text-base md:text-xl text-slate-600 mb-4 md:mb-6">
          Today's verse • {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6 md:mb-8">
          <div className="flex items-center space-x-2">
            <label htmlFor="translation" className="text-sm font-medium text-slate-700">
              Translation:
            </label>
            <select
              id="translation"
              value={translation}
              onChange={(e) => handleTranslationChange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white text-sm"
            >
              <option value="kjv">KJV</option>
              <option value="niv">NIV</option>
              <option value="esv">ESV</option>
              <option value="nlt">NLT</option>
              <option value="amharic1954">አማርኛ 1954</option>
              <option value="amharic-new">አዲሱ መደበኛ ትርጉም</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="h-6 w-6 md:h-8 md:w-8 animate-spin text-blue-600" />
        </div>
      ) : dailyVerse && (
        <div className="mb-6 md:mb-8">
          <VerseCard verse={dailyVerse} />
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
        <Link
          to="/search"
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800">Search Scriptures</h3>
              <p className="text-sm md:text-base text-slate-600">Find verses by keyword or topic</p>
            </div>
          </div>
        </Link>

        <Link
          to="/random"
          className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-lg group-hover:bg-amber-200 transition-colors">
              <RefreshCw className="h-5 w-5 md:h-6 md:w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-slate-800">Random Verse</h3>
              <p className="text-sm md:text-base text-slate-600">Discover inspiration anywhere</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;