export class Chapter {
  'id': number;
  'revelation_place': string;
  'revelation_order': number;
  'bismillah_pre': boolean;
  'name_simple': string;
  'name_complex': string;
  'name_arabic': string;
  'verses_count': number;
  'pages': number[];
  'translated_name': {
    language_name: string;
    name: string;
  };
}

export class Surah {
  number: number;
  name: string;
  ayahs: Ayah[];
  numberOfAyahs: number;
  edition: {
    direction: string;
    identifier: string;
  };
}
export class Ayah {
  number: number;
  text: string;
  audio?: string;
}

export const LANGUAGE_CODE = {
  hi: ['quran-simple','ar.abdulbasitmurattal', 'hi.hindi'],
  ur: ['quran-simple','ar.abdulbasitmurattal', 'ur.ahmedali','ur.khan'],
  ar: ['quran-simple','ar.abdulbasitmurattal'],
  en: ['quran-simple','ar.abdulbasitmurattal', 'en.ahmedali', 'en.transliteration', 'en.walk'],
};

export const EditionMapping = {
  'quran-simple': 'main',
  'ar.abdulbasitmurattal': 'main-audio',
  'hi.hindi': 'translation',
  'ur.ahmedali': 'translation',
  'en.ahmedali': 'translation',
  'en.transliteration': 'translitration',
  'en.walk': 'audio',
  'ur.khan':'audio'
};
