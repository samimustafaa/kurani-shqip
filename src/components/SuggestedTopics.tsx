import React from 'react';
import { SUGGESTED_TOPICS } from '../constants/suggestedVerses';

interface SuggestedTopicsProps {
  onTopicSelect: (topic: string) => void;
}

export default function SuggestedTopics({ onTopicSelect }: SuggestedTopicsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Temat e sugjeruara:</h2>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onTopicSelect(topic.text)}
            className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors text-sm"
          >
            {topic.text}
          </button>
        ))}
      </div>
    </div>
  );
}