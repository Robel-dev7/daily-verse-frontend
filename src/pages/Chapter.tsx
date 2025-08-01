
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChapterViewer from '../components/ChapterViewer';
import { RefreshCw } from 'lucide-react';
import { fetchChapter } from '../utils/api';


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



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (translation && book && chapter) {
          const chapterNum = Number(chapter);
          const data = await fetchChapter(translation, book, chapterNum);
          // The backend returns { book, chapter, verses, translation }
          setChapterData(data);
        } else {
          setChapterData(null);
        }
      } catch (error) {
        setChapterData(null);
      }
      setLoading(false);
    };
    fetchData();
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