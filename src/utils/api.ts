// API configuration for deployed backend
const API_BASE_URL = 'https://daily-verse.onrender.com/api';

// API endpoints
export const API_ENDPOINTS = {
  // Daily verse (optionally add theme param)
  DAILY_VERSE: (translation: string, theme?: string) => {
    let url = `${API_BASE_URL}/verse/daily/?translation=${translation}`;
    if (theme) url += `&theme=${encodeURIComponent(theme)}`;
    return url;
  },

  // Search
  SEARCH: (query: string, translation: string) => `${API_BASE_URL}/search/?q=${encodeURIComponent(query)}&translation=${translation}`,

  // Chapter
  CHAPTER: (translation: string, book: string, chapter: number) => 
    `${API_BASE_URL}/chapter/${translation}/${book}/${chapter}/`,

  // Specific verse
  VERSE: (translation: string, book: string, chapter: number, verse: number) => 
    `${API_BASE_URL}/verse/${translation}/${book}/${chapter}/${verse}/`,

  // Random verse
  RANDOM_VERSE: (translation: string) => `${API_BASE_URL}/verse/random/?translation=${translation}`,

  // Archive (month, year as query params)
  ARCHIVE: (month: number, year: number) => `${API_BASE_URL}/verse/daily/archive/?month=${month}&year=${year}`,

  // Commentaries
  COMMENTARIES: `${API_BASE_URL}/commentaries/`,
  COMMENTARY: (commentaryId: string, book: string, chapter: number, verse: number) => 
    `${API_BASE_URL}/commentaries/${commentaryId}/${book}/${chapter}/${verse}/`,

  // Books
  BOOKS: `${API_BASE_URL}/books/`,
  BOOK_CHAPTERS: (book: string) => `${API_BASE_URL}/books/${book}/chapters/`,

  // Health check
  HEALTH: `${API_BASE_URL}/health/`,
};

// Generic API fetch function
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Specific API functions
// 1. Daily Verse (optionally with theme)
export const fetchDailyVerse = (translation: string, theme?: string) => 
  apiRequest(API_ENDPOINTS.DAILY_VERSE(translation, theme));

// 2. Search Verses by keyword
export const searchVerses = (query: string, translation: string) => 
  apiRequest(API_ENDPOINTS.SEARCH(query, translation));

// 3. Get Entire Chapter
export const fetchChapter = (translation: string, book: string, chapter: number) => 
  apiRequest(API_ENDPOINTS.CHAPTER(translation, book, chapter));

// 4. Get Specific Verse
export const fetchVerse = (translation: string, book: string, chapter: number, verse: number) => 
  apiRequest(API_ENDPOINTS.VERSE(translation, book, chapter, verse));

// 5. Get a Random Verse
export const fetchRandomVerse = (translation: string) => 
  apiRequest(API_ENDPOINTS.RANDOM_VERSE(translation));

// 6. Verse of the Day Archive
export const fetchArchive = (month: number, year: number) => 
  apiRequest(API_ENDPOINTS.ARCHIVE(month, year));

// 7. Get all Commentaries
export const fetchCommentaries = () => 
  apiRequest(API_ENDPOINTS.COMMENTARIES);

// 8. Get Commentary for a Verse
export const fetchCommentary = (commentaryId: string, book: string, chapter: number, verse: number) => 
  apiRequest(API_ENDPOINTS.COMMENTARY(commentaryId, book, chapter, verse));

// 9. Get all Books
export const fetchBooks = () => 
  apiRequest(API_ENDPOINTS.BOOKS);

// 10. Get Chapters for a Book
export const fetchBookChapters = (book: string) => 
  apiRequest(API_ENDPOINTS.BOOK_CHAPTERS(book));

// 11. Health Check
export const fetchHealth = () =>
  apiRequest(API_ENDPOINTS.HEALTH);