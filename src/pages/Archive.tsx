import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VerseCard from '../components/VerseCard';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const Archive = () => {
  const { year, month } = useParams();
  const [archiveData, setArchiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentYear = parseInt(year || '2025');
  const currentMonth = parseInt(month || '1');

  // Mock archive data
  const mockArchiveData = [
    {
      date: '2025-01-01',
      verse: {
        text: "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
        reference: "2 Corinthians 5:17",
        book: "2 Corinthians",
        chapter: 5,
        verse: 17,
        translation: "kjv"
      }
    },
    {
      date: '2025-01-02',
      verse: {
        text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding.",
        reference: "Proverbs 3:5",
        book: "Proverbs",
        chapter: 3,
        verse: 5,
        translation: "kjv"
      }
    },
    {
      date: '2025-01-03',
      verse: {
        text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
        reference: "John 3:16",
        book: "John",
        chapter: 3,
        verse: 16,
        translation: "kjv"
      }
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setArchiveData(mockArchiveData);
      setLoading(false);
    }, 500);
  }, [year, month]);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Scripture Archive</h1>
        
        <div className="flex items-center justify-center space-x-4 mb-6">
          <Link
            to={`/archive/${prevYear}/${prevMonth}`}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>{monthNames[prevMonth - 1]} {prevYear}</span>
          </Link>
          
          <h2 className="text-xl font-semibold text-slate-700">
            {monthNames[currentMonth - 1]} {currentYear}
          </h2>
          
          <Link
            to={`/archive/${nextYear}/${nextMonth}`}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>{monthNames[nextMonth - 1]} {nextYear}</span>
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Calendar className="h-8 w-8 animate-pulse text-blue-600" />
        </div>
      ) : (
        <div className="space-y-6">
          {archiveData.map((entry, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <p className="text-sm text-slate-600 mb-2">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <VerseCard verse={entry.verse} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;