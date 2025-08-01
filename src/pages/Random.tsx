
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, BookOpen, MessageSquare } from 'lucide-react';
import { fetchRandomVerse } from '../utils/api';

const Random: React.FC = () => {
  const navigate = useNavigate();

  const [verse, setVerse] = useState<any>(null);
  const [translation, setTranslation] = useState('kjv');
  const [loading, setLoading] = useState(false);


  const getRandomVerse = async (selectedTranslation: string) => {
    setLoading(true);
    try {
      const data = await fetchRandomVerse(selectedTranslation);
      setVerse({
        ...data,
        reference: data.reference || `${data.book} ${data.chapter}:${data.verse}`
      });
    } catch (error) {
      setVerse(null);
    }
    setLoading(false);
  };


  useEffect(() => {
    getRandomVerse(translation);
    // eslint-disable-next-line
  }, [translation]);

  const handleNewVerse = () => {
    getRandomVerse(translation);
  };

  const handleReadChapter = () => {
    if (verse) {
      navigate(`/chapter/${translation}/${verse.book}/${verse.chapter}`);
    }
  };

  const handleCommentary = () => {
    if (verse) {
      navigate(`/commentary/matthew-henry/${verse.book}/${verse.chapter}/${verse.verse}`);
    }
  };

  const isAmharic = translation.includes('amharic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Random Verse
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Discover inspiration through God's Word with a randomly selected verse
          </p>
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
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading verse...</p>
          </div>
        ) : verse ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
            <blockquote className={`text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 mb-4 sm:mb-6 ${isAmharic ? 'amharic-text' : 'font-serif'}`}>
              "{verse.text}"
            </blockquote>
            <cite className={`block text-base sm:text-lg font-semibold text-blue-600 ${isAmharic ? 'amharic-text' : ''}`}>
              {verse.reference}
            </cite>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleNewVerse}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 ${loading ? 'animate-spin' : ''}`} />
            Another Verse
          </button>
          
          {verse && (
            <>
              <button
                onClick={handleReadChapter}
                className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                Read Chapter
              </button>
              
              <button
                onClick={handleCommentary}
                className="flex items-center justify-center gap-2 bg-amber-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-amber-700 transition-colors text-sm sm:text-base"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                Commentary
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Random;