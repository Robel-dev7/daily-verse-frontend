import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ExternalLink } from 'lucide-react';

interface VerseCardProps {
  verse: {
    text: string;
    reference: string;
    book: string;
    chapter: number;
    verse: number;
    translation: string;
  };
  showActions?: boolean;
  className?: string;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse, showActions = true, className = "" }) => {
  const isAmharic = verse.translation === 'amharic1954' || verse.translation === 'amharic-new';
  
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-6 hover:shadow-md transition-shadow ${className}`}>
      <blockquote className={`verse-text text-base md:text-lg leading-relaxed text-slate-800 mb-4 ${
        isAmharic ? 'amharic-text font-medium' : 'font-serif'
      }`}>
        "{verse.text}"
      </blockquote>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <cite className={`verse-reference text-blue-800 font-semibold not-italic ${
          isAmharic ? 'amharic-text' : ''
        }`}>
          {verse.reference} ({verse.translation.toUpperCase()})
        </cite>
        
        {showActions && (
          <div className="flex space-x-3 sm:space-x-2">
            <Link
              to={`/verse/${verse.translation}/${verse.book}/${verse.chapter}/${verse.verse}`}
              className="flex items-center space-x-1 text-slate-600 hover:text-blue-800 transition-colors text-xs md:text-sm"
            >
              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
              <span>View</span>
            </Link>
            <Link
              to={`/commentary/matthew-henry/${verse.book}/${verse.chapter}/${verse.verse}`}
              className="flex items-center space-x-1 text-slate-600 hover:text-blue-800 transition-colors text-xs md:text-sm"
            >
              <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
              <span>Commentary</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerseCard;