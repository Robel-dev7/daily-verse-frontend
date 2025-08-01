import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterViewerProps {
  chapter: {
    book: string;
    chapter: number;
    translation: string;
    verses: Array<{
      verse: number;
      text: string;
    }>;
  };
  prevChapter?: { book: string; chapter: number };
  nextChapter?: { book: string; chapter: number };
}

const ChapterViewer: React.FC<ChapterViewerProps> = ({ chapter, prevChapter, nextChapter }) => {
  const isAmharic = chapter.translation === 'amharic1954' || chapter.translation === 'amharic-new';
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 md:p-8">
        <div className="text-center mb-6 md:mb-8">
          <h1 className={`text-2xl md:text-3xl font-bold text-slate-800 mb-2 ${
            isAmharic ? 'amharic-text' : ''
          }`}>
            {chapter.book} {chapter.chapter}
          </h1>
          <p className={`text-slate-600 ${isAmharic ? 'amharic-text' : ''}`}>
            ({chapter.translation === 'amharic1954' ? 'አማርኛ 1954' : 
              chapter.translation === 'amharic-new' ? 'አዲሱ መደበኛ ትርጉም' : 
              chapter.translation.toUpperCase()})
          </p>
        </div>

        <div className="prose prose-base md:prose-lg max-w-none">
          {chapter.verses.map((verse) => (
            <p key={verse.verse} className={`mb-4 leading-relaxed text-slate-800 ${
              isAmharic ? 'amharic-text font-medium' : 'font-serif'
            }`}>
              <Link
                to={`/verse/${chapter.translation}/${chapter.book}/${chapter.chapter}/${verse.verse}`}
                className="inline-block w-6 md:w-8 text-center text-xs md:text-sm font-bold text-blue-600 hover:text-blue-800 mr-2 no-underline"
              >
                {verse.verse}
              </Link>
              {verse.text}
            </p>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 md:mt-8 pt-4 md:pt-6 border-t border-slate-200 gap-4">
          {prevChapter ? (
            <Link
              to={`/chapter/${chapter.translation}/${prevChapter.book}/${prevChapter.chapter}`}
              className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base ${isAmharic ? 'amharic-text' : ''}`}
            >
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              <span>{prevChapter.book} {prevChapter.chapter}</span>
            </Link>
          ) : <div className="hidden sm:block" />}

          {nextChapter && (
            <Link
              to={`/chapter/${chapter.translation}/${nextChapter.book}/${nextChapter.chapter}`}
              className={`flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors text-sm md:text-base ${isAmharic ? 'amharic-text' : ''}`}
            >
              <span>{nextChapter.book} {nextChapter.chapter}</span>
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterViewer;