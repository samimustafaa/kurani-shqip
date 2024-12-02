import React from 'react';
import { Bookmark, BookmarkCheck, PlayCircle } from 'lucide-react';
import { Verse } from '../types/quran';
import AudioPlayer from './AudioPlayer';
import { useBookmarkStore } from '../store/useBookmarkStore';

interface VerseCardProps {
  verse: Verse;
  onBookmark?: (verse: Verse) => void;
  onPlay?: (verse: Verse) => void;
  currentAudio?: string | null;
  isBookmarked?: boolean;
}

export default function VerseCard({ 
  verse, 
  onBookmark, 
  onPlay,
  currentAudio,
  isBookmarked: isBookmarkedProp 
}: VerseCardProps) {
  const { isBookmarked } = useBookmarkStore();
  const isVerseBookmarked = isBookmarkedProp ?? isBookmarked(verse.id);
  const isPlaying = currentAudio === verse.audio_url;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-emerald-600 font-medium">{verse.verse_key}</span>
        <div className="flex space-x-2">
          {onPlay && verse.audio_url && (
            <AudioPlayer
              audioUrl={verse.audio_url}
              isPlaying={isPlaying}
              onTogglePlay={() => onPlay(verse)}
            />
          )}
          {onBookmark && (
            <button
              onClick={() => onBookmark(verse)}
              className="text-gray-500 hover:text-emerald-600 transition-colors"
            >
              {isVerseBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-emerald-600" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xl text-right font-arabic leading-loose">{verse.text_uthmani}</p>
        <p className="text-gray-700 leading-relaxed">{verse.translation}</p>
      </div>
    </div>
  );
}