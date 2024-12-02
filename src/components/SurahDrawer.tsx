import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Menu, X } from 'lucide-react';
import { useQuery } from 'react-query';
import { getSurahs } from '../services/quranApi';
import clsx from 'clsx';

interface SurahDrawerProps {
  onSurahSelect: (surahId: number) => void;
}

export default function SurahDrawer({ onSurahSelect }: SurahDrawerProps) {
  const { data: surahs, isLoading } = useQuery('surahs', getSurahs);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSurahClick = (surahId: number) => {
    onSurahSelect(surahId);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-80 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Suret</h2>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-8rem)]">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-emerald-500 border-t-transparent"></div>
              </div>
            ) : (
              surahs?.map((surah) => (
                <button
                  key={surah.id}
                  onClick={() => handleSurahClick(surah.id)}
                  className={clsx(
                    'w-full px-4 py-3 text-left rounded-lg',
                    'hover:bg-emerald-50 transition-colors'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{surah.name_simple}</span>
                    <span className="text-sm text-gray-500">
                      {surah.verses_count} verses
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}