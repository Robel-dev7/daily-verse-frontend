import React from 'react';
import { ChevronDown } from 'lucide-react';

interface CommentaryViewerProps {
  commentary: {
    id: string;
    name: string;
    author: string;
    text: string;
  };
  verse: {
    reference: string;
    text: string;
  };
  availableCommentaries: Array<{
    id: string;
    name: string;
    author: string;
  }>;
  onCommentaryChange: (commentaryId: string) => void;
}

const CommentaryViewer: React.FC<CommentaryViewerProps> = ({
  commentary,
  verse,
  availableCommentaries,
  onCommentaryChange
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
        <div className="mb-8">
          <blockquote className="text-lg font-serif text-slate-800 mb-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            "{verse.text}"
          </blockquote>
          <cite className="text-blue-800 font-semibold">{verse.reference}</cite>
        </div>

        <div className="mb-6">
          <label htmlFor="commentary-select" className="block text-sm font-medium text-slate-700 mb-2">
            Select Commentary
          </label>
          <div className="relative">
            <select
              id="commentary-select"
              value={commentary.id}
              onChange={(e) => onCommentaryChange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none"
            >
              {availableCommentaries.map((comm) => (
                <option key={comm.id} value={comm.id}>
                  {comm.name} - {comm.author}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            {commentary.name}
          </h3>
          <p className="text-sm text-slate-600 mb-4">by {commentary.author}</p>
          <div className="prose prose-slate max-w-none">
            <p className="leading-relaxed text-slate-700 whitespace-pre-line">
              {commentary.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentaryViewer;