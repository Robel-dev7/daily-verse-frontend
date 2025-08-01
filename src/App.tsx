import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Chapter from './pages/Chapter';
import Verse from './pages/Verse';
import Archive from './pages/Archive';
import Commentary from './pages/Commentary';
import Random from './pages/Random';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 pb-safe">
        <Navigation />
        <main className="container mx-auto px-2 sm:px-4 py-4 md:py-8 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/chapter/:translation/:book/:chapter" element={<Chapter />} />
            <Route path="/verse/:translation/:book/:chapter/:verse" element={<Verse />} />
            <Route path="/archive/:year/:month" element={<Archive />} />
            <Route path="/commentary/:commentaryId/:book/:chapter/:verse" element={<Commentary />} />
            <Route path="/random" element={<Random />} />
          </Routes>
        </main>
        <footer className="w-full py-4 bg-white/80 border-t border-slate-200 text-center shadow-sm">
          <span className="text-slate-600 text-sm">
            Developed by{' '}
            <a
              href="https://www.instagram.com/astuecsf2k19/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline hover:text-blue-800 transition-colors font-semibold"
            >
              ASTUECSF
            </a>{' '}
            DS Programming Team
          </span>
        </footer>
      </div>
    </Router>
  );
}

export default App;