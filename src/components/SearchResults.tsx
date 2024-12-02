import React from 'react';
import VerseCard from './VerseCard';
import { Verse } from '../types/quran';

interface SearchResultsProps {
  isLoading: boolean;
  searchQuery: string;
  verses?: Verse[];
  onBookmark: (verse: Verse) => void;
  onPlay: (verse: Verse) => void;
  currentAudio: string | null;
}

export default function SearchResults({ 
  isLoading, 
  searchQuery, 
  verses, 
  onBookmark,
  onPlay,
  currentAudio,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!searchQuery) {
    return null;
  }

  if (!verses?.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        Nuk u gjetën rezultate për kërkimin tuaj.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">
        Rezultatet për "{searchQuery}":
      </h2>
      <div className="space-y-4">
        {verses.map((verse) => (
          <VerseCard
            key={verse.id}
            verse={verse}
            onBookmark={onBookmark}
            onPlay={onPlay}
            currentAudio={currentAudio}
          />
        ))}
      </div>
    </div>
  );
}