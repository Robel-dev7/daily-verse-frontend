import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentaryViewer from '../components/CommentaryViewer';
import { RefreshCw } from 'lucide-react';

const Commentary = () => {
  const { commentaryId, book, chapter, verse } = useParams();
  const [commentaryData, setCommentaryData] = useState(null);
  const [verseData, setVerseData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockVerseData = {
    reference: `${book} ${chapter}:${verse}`,
    text: "In the beginning God created the heaven and the earth."
  };

  const mockCommentaryData = {
    id: commentaryId || 'matthew-henry',
    name: "Matthew Henry's Concise Commentary",
    author: "Matthew Henry",
    text: `This passage reveals the fundamental truth about the origin of all things. "In the beginning" - these words take us back to the very dawn of time itself, before anything existed except God. The Hebrew word "bara" for "created" implies bringing something into existence from nothing, which only God can do.

The phrase "God created" establishes God as the sovereign Creator, the one who alone has the power to bring forth existence from non-existence. This is not a process of formation from existing materials, but true creation ex nihilo.

"The heaven and the earth" is a Hebrew idiom meaning the totality of creation - everything that exists. This comprehensive statement declares that God is the source and origin of all reality, both visible and invisible, material and spiritual.

This opening verse forms the foundation for understanding our relationship with God and our place in His creation. We are not accidents of nature, but purposeful creations of a loving God who designed and formed the universe with intention and care.`
  };

  const availableCommentaries = [
    { id: 'matthew-henry', name: "Matthew Henry's Concise Commentary", author: 'Matthew Henry' },
    { id: 'john-wesley', name: "John Wesley's Notes", author: 'John Wesley' },
    { id: 'adam-clarke', name: "Adam Clarke Commentary", author: 'Adam Clarke' }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVerseData(mockVerseData);
      setCommentaryData(mockCommentaryData);
      setLoading(false);
    }, 500);
  }, [commentaryId, book, chapter, verse]);

  const handleCommentaryChange = (newCommentaryId: string) => {
    setLoading(true);
    // Simulate API call for different commentary
    setTimeout(() => {
      const newCommentary = {
        ...mockCommentaryData,
        id: newCommentaryId,
        name: availableCommentaries.find(c => c.id === newCommentaryId)?.name || mockCommentaryData.name,
        author: availableCommentaries.find(c => c.id === newCommentaryId)?.author || mockCommentaryData.author
      };
      setCommentaryData(newCommentary);
      setLoading(false);
    }, 300);
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