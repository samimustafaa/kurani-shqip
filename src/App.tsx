import React from 'react';
import { useQuery } from 'react-query';
import { Book } from 'lucide-react';
import SearchSection from './components/SearchSection';
import SearchResults from './components/SearchResults';
import SurahDrawer from './components/SurahDrawer';
import BookmarksDrawer from './components/BookmarksDrawer';
import { searchVerses } from './services/quranApi';
import { useBookmarkStore } from './store/useBookmarkStore';
import { Verse } from './types/quran';

function App() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentAudio, setCurrentAudio] = React.useState<string | null>(null);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  const { data: searchResults, isLoading } = useQuery(
    ['verses', searchQuery],
    () => searchVerses(searchQuery),
    {
      enabled: !!searchQuery,
    }
  );

  const handleBookmark = (verse: Verse) => {
    if (isBookmarked(verse.id)) {
      removeBookmark(verse.id);
    } else {
      addBookmark(verse);
    }
  };

  const handlePlay = (verse: Verse) => {
    if (currentAudio === verse.audio_url) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(verse.audio_url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Book className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-gray-900">Kurani në Shqip</h1>
            </div>
            <div className="flex items-center space-x-2">
              <SurahDrawer onSurahSelect={(surahId) => setSearchQuery(`surah:${surahId}`)} />
              <BookmarksDrawer />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchSection onSearch={setSearchQuery} />
        <SearchResults
          isLoading={isLoading}
          searchQuery={searchQuery}
          verses={searchResults?.verses}
          onBookmark={handleBookmark}
          onPlay={handlePlay}
          currentAudio={currentAudio}
        />
      </main>
    </div>
  );
}

export default App;