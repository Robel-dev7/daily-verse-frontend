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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-safe">
        <Navigation />
        <main className="container mx-auto px-2 sm:px-4 py-4 md:py-8">
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
      </div>
    </Router>
  );
}

export default App;