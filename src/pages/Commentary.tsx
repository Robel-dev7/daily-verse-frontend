
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentaryViewer from '../components/CommentaryViewer';
import { RefreshCw } from 'lucide-react';
import { fetchCommentary, fetchVerse } from '../utils/api';


const availableCommentaries = [
  { id: 'matthew-henry', name: "Matthew Henry's Concise Commentary", author: 'Matthew Henry' },
  { id: 'john-wesley', name: "John Wesley's Notes", author: 'John Wesley' },
  { id: 'adam-clarke', name: "Adam Clarke Commentary", author: 'Adam Clarke' }
];

const Commentary = () => {
  const { commentaryId, book, chapter, verse } = useParams();
  const [commentaryData, setCommentaryData] = useState<any>(null);
  const [verseData, setVerseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (commentaryId && book && chapter && verse) {
          const chapterNum = Number(chapter);
          const verseNum = Number(verse);
          const [commentary, verseObj] = await Promise.all([
            fetchCommentary(commentaryId, book, chapterNum, verseNum),
            fetchVerse('kjv', book, chapterNum, verseNum), // Default to KJV for verse text
          ]);
          setCommentaryData({
            id: commentaryId,
            name: availableCommentaries.find(c => c.id === commentaryId)?.name || '',
            author: availableCommentaries.find(c => c.id === commentaryId)?.author || '',
            text: commentary.text,
            reference: commentary.reference,
          });
          setVerseData({
            reference: verseObj.reference || `${book} ${chapter}:${verse}`,
            text: verseObj.text,
          });
        } else {
          setCommentaryData(null);
          setVerseData(null);
        }
      } catch (error) {
        setCommentaryData(null);
        setVerseData(null);
      }
      setLoading(false);
    };
    fetchData();
  }, [commentaryId, book, chapter, verse]);

  const handleCommentaryChange = async (newCommentaryId: string) => {
    setLoading(true);
    try {
      if (newCommentaryId && book && chapter && verse) {
        const chapterNum = Number(chapter);
        const verseNum = Number(verse);
        const commentary = await fetchCommentary(newCommentaryId, book, chapterNum, verseNum);
        setCommentaryData({
          id: newCommentaryId,
          name: availableCommentaries.find(c => c.id === newCommentaryId)?.name || '',
          author: availableCommentaries.find(c => c.id === newCommentaryId)?.author || '',
          text: commentary.text,
          reference: commentary.reference,
        });
      }
    } catch (error) {
      setCommentaryData(null);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!commentaryData || !verseData) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Commentary not found</p>
      </div>
    );
  }

  return (
    <CommentaryViewer
      commentary={commentaryData}
      verse={verseData}
      availableCommentaries={availableCommentaries}
      onCommentaryChange={handleCommentaryChange}
    />
  );
};

export default Commentary;