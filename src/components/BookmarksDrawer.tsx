import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { BookmarkIcon, X } from 'lucide-react';
import { useBookmarkStore } from '../store/useBookmarkStore';
import VerseCard from './VerseCard';

export default function BookmarksDrawer() {
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <BookmarkIcon className="h-6 w-6" />
          {bookmarks.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {bookmarks.length}
            </span>
          )}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-96 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Vargjet e ruajtura</h2>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {bookmarks.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Nuk keni ruajtur asnjë varg ende
              </p>
            ) : (
              bookmarks.map((verse) => (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  onBookmark={() => removeBookmark(verse.id)}
                  isBookmarked
                />
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}