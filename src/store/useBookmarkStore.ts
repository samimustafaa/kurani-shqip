import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Verse } from '../types/quran';

interface BookmarkStore {
  bookmarks: Verse[];
  addBookmark: (verse: Verse) => void;
  removeBookmark: (verseId: number) => void;
  isBookmarked: (verseId: number) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (verse) => set((state) => ({
        bookmarks: [...state.bookmarks, verse],
      })),
      removeBookmark: (verseId) => set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== verseId),
      })),
      isBookmarked: (verseId) => get().bookmarks.some((b) => b.id === verseId),
    }),
    {
      name: 'quran-bookmarks',
    }
  )
);