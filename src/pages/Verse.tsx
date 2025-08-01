
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VerseDetails from '../components/VerseDetails';
import { RefreshCw } from 'lucide-react';
import { fetchVerse } from '../utils/api';

const Verse = () => {
  const { translation, book, chapter, verse } = useParams();

  const [verseData, setVerseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (translation && book && chapter && verse) {
          const chapterNum = Number(chapter);
          const verseNum = Number(verse);
          const data = await fetchVerse(translation, book, chapterNum, verseNum);
          setVerseData({
            ...data,
            reference: data.reference || `${book} ${chapter}:${verse}`,
          });
        } else {
          setVerseData(null);
        }
      } catch (error) {
        setVerseData(null);
      }
      setLoading(false);
    };
    fetchData();
  }, [translation, book, chapter, verse]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!verseData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Verse not found</p>
      </div>
    );
  }

  return <VerseDetails verse={verseData} />;
};

export default Verse;