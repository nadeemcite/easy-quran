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
  number:number;
  name:string;
  ayahs:Ayah[ ];
  numberOfAyahs:number;
  edition:{
    direction:string;
  }
}
export class Ayah{
  number:number;
  text:string
}