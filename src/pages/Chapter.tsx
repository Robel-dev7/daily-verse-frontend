import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChapterViewer from '../components/ChapterViewer';
import { RefreshCw } from 'lucide-react';


interface ChapterData {
  book: string;
  chapter: number;
  translation: string;
  verses: {
    verse: number;
    text: string;
  }[];
}

const Chapter = () => {
  const { translation, book, chapter } = useParams();
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock chapter data
  const mockChapterData = {
    book: book || 'Genesis',
    chapter: parseInt(chapter || '1'),
    translation: translation || 'kjv',
    verses: [
      {
        verse: 1,
        text: "In the beginning God created the heaven and the earth."
      },
      {
        verse: 2,
        text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
      },
      {
        verse: 3,
        text: "And God said, Let there be light: and there was light."
      },
      {
        verse: 4,
        text: "And God saw the light, that it was good: and God divided the light from the darkness."
      },
      {
        verse: 5,
        text: "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day."
      }
    ]
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setChapterData(mockChapterData);
      setLoading(false);
    }, 500);
  }, [translation, book, chapter]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!chapterData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Chapter not found</p>
      </div>
    );
  }

  return (
    <ChapterViewer
      chapter={chapterData}
      prevChapter={chapterData.chapter > 1 ? { book: chapterData.book, chapter: chapterData.chapter - 1 } : undefined}
      nextChapter={{ book: chapterData.book, chapter: chapterData.chapter + 1 }}
    />
  );
};

export default Chapter;