// API configuration for Django backend
const API_BASE_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-django-backend.com/api' 
  : 'http://localhost:8000/api';

// API endpoints
export const API_ENDPOINTS = {
  // Daily verse
  DAILY_VERSE: (translation: string) => `${API_BASE_URL}/verse/daily/?translation=${translation}`,
  
  // Search
  SEARCH: (query: string, translation: string) => `${API_BASE_URL}/search/?q=${encodeURIComponent(query)}&translation=${translation}`,
  
  // Chapter
  CHAPTER: (translation: string, book: string, chapter: string) => 
    `${API_BASE_URL}/chapter/${translation}/${book}/${chapter}/`,
  
  // Specific verse
  VERSE: (translation: string, book: string, chapter: string, verse: string) => 
    `${API_BASE_URL}/verse/${translation}/${book}/${chapter}/${verse}/`,
  
  // Random verse
  RANDOM_VERSE: (translation: string) => `${API_BASE_URL}/verse/random/?translation=${translation}`,
  
  // Archive
  ARCHIVE: (year: string, month: string) => `${API_BASE_URL}/verse/daily/archive/?year=${year}&month=${month}`,
  
  // Commentaries
  COMMENTARIES: `${API_BASE_URL}/commentaries/`,
  COMMENTARY: (commentaryId: string, book: string, chapter: string, verse: string) => 
    `${API_BASE_URL}/commentaries/${commentaryId}/${book}/${chapter}/${verse}/`,
  
  // Books
  BOOKS: `${API_BASE_URL}/books/`,
  BOOK_CHAPTERS: (book: string) => `${API_BASE_URL}/books/${book}/chapters/`,
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
export const fetchDailyVerse = (translation: string) => 
  apiRequest(API_ENDPOINTS.DAILY_VERSE(translation));

export const searchVerses = (query: string, translation: string) => 
  apiRequest(API_ENDPOINTS.SEARCH(query, translation));

export const fetchChapter = (translation: string, book: string, chapter: string) => 
  apiRequest(API_ENDPOINTS.CHAPTER(translation, book, chapter));

export const fetchVerse = (translation: string, book: string, chapter: string, verse: string) => 
  apiRequest(API_ENDPOINTS.VERSE(translation, book, chapter, verse));

export const fetchRandomVerse = (translation: string) => 
  apiRequest(API_ENDPOINTS.RANDOM_VERSE(translation));

export const fetchArchive = (year: string, month: string) => 
  apiRequest(API_ENDPOINTS.ARCHIVE(year, month));

export const fetchCommentaries = () => 
  apiRequest(API_ENDPOINTS.COMMENTARIES);

export const fetchCommentary = (commentaryId: string, book: string, chapter: string, verse: string) => 
  apiRequest(API_ENDPOINTS.COMMENTARY(commentaryId, book, chapter, verse));

export const fetchBooks = () => 
  apiRequest(API_ENDPOINTS.BOOKS);

export const fetchBookChapters = (book: string) => 
  apiRequest(API_ENDPOINTS.BOOK_CHAPTERS(book));