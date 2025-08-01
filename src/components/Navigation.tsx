import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Search, Home, Archive, Shuffle, MessageSquare } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-800 font-bold text-lg md:text-xl">
            <Book className="h-8 w-8" />
            <span className="hidden sm:inline">Scripture Daily</span>
            <span className="sm:hidden">Bible</span>
          </Link>
          
          <div className="flex space-x-1 mobile-nav">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-slate-600 hover:text-blue-800 hover:bg-slate-100'
              }`}
            >
              <Home className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/search"
              className={`flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                isActive('/search')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-slate-600 hover:text-blue-800 hover:bg-slate-100'
              }`}
            >
              <Search className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link
              to="/random"
              className={`flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                isActive('/random')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-slate-600 hover:text-blue-800 hover:bg-slate-100'
              }`}
            >
              <Shuffle className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Random</span>
            </Link>
            
            <Link
              to="/archive/2025/1"
              className={`flex items-center space-x-1 px-2 md:px-3 py-2 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname.startsWith('/archive')
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-slate-600 hover:text-blue-800 hover:bg-slate-100'
              }`}
            >
              <Archive className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Archive</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;