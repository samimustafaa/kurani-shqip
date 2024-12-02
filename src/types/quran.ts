export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  translation: string;
  audio_url?: string;
}

export interface SearchResult {
  verses: Verse[];
  total: number;
  current_page: number;
  total_pages: number;
}

export interface Surah {
  id: number;
  name: string;
  name_simple: string;
  verses_count: number;
}