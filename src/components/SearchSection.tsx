import React from 'react';
import SearchBar from './SearchBar';
import SuggestedTopics from './SuggestedTopics';
import PopularVerses from './PopularVerses';

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

export default function SearchSection({ onSearch }: SearchSectionProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="max-w-4xl mx-auto">
        <SuggestedTopics onTopicSelect={onSearch} />
        <PopularVerses onVerseSelect={onSearch} />
      </div>
    </div>
  );
}