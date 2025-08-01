import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VerseDetails from '../components/VerseDetails';
import { RefreshCw } from 'lucide-react';

const Verse = () => {
  const { translation, book, chapter, verse } = useParams();
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock verse data
  const mockVerseData = {
    text: "In the beginning God created the heaven and the earth.",
    reference: `${book} ${chapter}:${verse}`,
    book: book || 'Genesis',
    chapter: parseInt(chapter || '1'),
    verse: parseInt(verse || '1'),
    translation: translation || 'kjv'
  };

  const mockContext = {
    nextVerse: {
      verse: parseInt(verse || '1') + 1,
      text: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters."
    }
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerseData(mockVerseData);
      setLoading(false);
    }, 500);
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

  return <VerseDetails verse={verseData} context={mockContext} />;
};

export default Verse;