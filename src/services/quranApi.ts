import { SearchResult, Surah, Verse } from '../types/quran';

const BASE_URL = 'https://api.quran.com/api/v4';

export const searchVerses = async (query: string, page = 1): Promise<SearchResult> => {
  try {
    if (query.startsWith('surah:')) {
      const surahId = query.split(':')[1];
      const response = await fetch(
        `${BASE_URL}/verses/by_chapter/${surahId}?language=sq&words=true&page=${page}&per_page=10`
      );
      const data = await response.json();
      
      return {
        verses: data.verses.map((verse: any) => ({
          id: verse.id,
          verse_key: verse.verse_key,
          text_uthmani: verse.text_uthmani,
          translation: verse.translations?.[0]?.text || 'Translation not available',
          audio_url: verse.audio?.url,
        })),
        total: data.pagination.total_records,
        current_page: data.pagination.current_page,
        total_pages: data.pagination.total_pages,
      };
    } else {
      const response = await fetch(
        `${BASE_URL}/search?q=${encodeURIComponent(query)}&size=10&page=${page}&language=sq`
      );
      const data = await response.json();
      
      return {
        verses: data.search.results.map((result: any) => ({
          id: result.verse_id,
          verse_key: result.verse_key,
          text_uthmani: result.text,
          translation: result.translations[0]?.text || 'Translation not available',
          audio_url: `https://verses.quran.com/${result.verse_key}.mp3`,
        })),
        total: data.search.total_results,
        current_page: page,
        total_pages: Math.ceil(data.search.total_results / 10),
      };
    }
  } catch (error) {
    console.error('Error fetching verses:', error);
    return {
      verses: [],
      total: 0,
      current_page: 1,
      total_pages: 1,
    };
  }
};

export const getSurahs = async (): Promise<Surah[]> => {
  try {
    const response = await fetch(`${BASE_URL}/chapters?language=sq`);
    const data = await response.json();
    
    return data.chapters.map((chapter: any) => ({
      id: chapter.id,
      name: chapter.name_arabic,
      name_simple: chapter.name_simple,
      verses_count: chapter.verses_count,
    }));
  } catch (error) {
    console.error('Error fetching surahs:', error);
    return [];
  }
};