import React from 'react';
import { Link } from 'react-router-dom';
import { Book, MessageSquare } from 'lucide-react';

interface VerseDetailsProps {
  verse: {
    text: string;
    reference: string;
    book: string;
    chapter: number;
    verse: number;
    translation: string;
  };
  context?: {
    prevVerse?: { verse: number; text: string };
    nextVerse?: { verse: number; text: string };
  };
}

const VerseDetails: React.FC<VerseDetailsProps> = ({ verse, context }) => {
  const isAmharic = verse.translation === 'amharic1954' || verse.translation === 'amharic-new';
  
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className={`text-xl md:text-2xl font-bold text-slate-800 mb-2 ${
            isAmharic ? 'amharic-text' : ''
          }`}>
            {verse.reference}
          </h1>
          <p className={`text-slate-600 ${isAmharic ? 'amharic-text' : ''}`}>
            ({verse.translation === 'amharic1954' ? 'አማርኛ 1954' : 
              verse.translation === 'amharic-new' ? 'አዲሱ መደበኛ ትርጉም' : 
              verse.translation.toUpperCase()})
          </p>
        </div>

        {context?.prevVerse && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-slate-50 rounded-lg">
            <p className={`text-slate-600 ${isAmharic ? 'amharic-text font-medium' : 'font-serif'}`}>
              <span className="font-bold text-slate-400 mr-2 text-sm">{verse.verse - 1}</span>
              {context.prevVerse.text}
            </p>
          </div>
        )}

        <blockquote className={`text-lg md:text-xl leading-relaxed text-slate-800 mb-4 md:mb-6 p-4 md:p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500 ${
          isAmharic ? 'amharic-text font-medium' : 'font-serif'
        }`}>
          <span className="font-bold text-blue-600 mr-2 text-base md:text-lg">{verse.verse}</span>
          {verse.text}
        </blockquote>

        {context?.nextVerse && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-slate-50 rounded-lg">
            <p className={`text-slate-600 ${isAmharic ? 'amharic-text font-medium' : 'font-serif'}`}>
              <span className="font-bold text-slate-400 mr-2 text-sm">{verse.verse + 1}</span>
              {context.nextVerse.text}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link
            to={`/chapter/${verse.translation}/${verse.book}/${verse.chapter}`}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
          >
            <Book className="h-4 w-4 md:h-5 md:w-5" />
            <span>Read Chapter</span>
          </Link>
          
          <Link
            to={`/commentary/matthew-henry/${verse.book}/${verse.chapter}/${verse.verse}`}
            className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm md:text-base"
          >
            <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
            <span>Commentary</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerseDetails;