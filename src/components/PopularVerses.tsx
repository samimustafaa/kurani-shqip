import React from 'react';
import { POPULAR_VERSES } from '../constants/suggestedVerses';

interface PopularVersesProps {
  onVerseSelect: (verseKey: string) => void;
}

export default function PopularVerses({ onVerseSelect }: PopularVersesProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Vargjet e famshme:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {POPULAR_VERSES.map((verse) => (
          <button
            key={verse.verse_key}
            onClick={() => onVerseSelect(verse.verse_key)}
            className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <h3 className="font-medium text-emerald-600">{verse.topic}</h3>
            <p className="text-sm text-gray-500">Verse: {verse.verse_key}</p>
          </button>
        ))}
      </div>
    </div>
  );
}