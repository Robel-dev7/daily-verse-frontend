
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VerseCard from '../components/VerseCard';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchArchive } from '../utils/api';


interface ArchiveEntry {
  date: string;
  verse: {
    text: string;
    reference: string;
    book: string;
    chapter: number;
    verse: number;
    translation: string;
  };
}

const Archive = () => {
  const { year, month } = useParams();
  const [archiveData, setArchiveData] = useState<ArchiveEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const currentYear = parseInt(year || '2025');
  const currentMonth = parseInt(month || '1');



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (year && month) {
          const yearNum = Number(year);
          const monthNum = Number(month);
          const data = await fetchArchive(monthNum, yearNum);
          // The backend returns an array of entries with date_shown, reference, text, translation, book, etc.
          // Map to ArchiveEntry[]
          const mapped = Array.isArray(data)
            ? data.map((entry: any) => ({
                date: entry.date_shown,
                verse: {
                  text: entry.text,
                  reference: entry.reference,
                  book: entry.book,
                  chapter: entry.chapter || 1,
                  verse: entry.verse || 1,
                  translation: entry.translation,
                },
              }))
            : [];
          setArchiveData(mapped);
        } else {
          setArchiveData([]);
        }
      } catch (error) {
        setArchiveData([]);
      }
      setLoading(false);
    };
    fetchData();
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