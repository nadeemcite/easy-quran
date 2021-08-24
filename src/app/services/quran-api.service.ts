import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chapter, Surah } from '../models/Chapter';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuranApiService {
  private readonly LOCAL_API_PREFIX: string = '/assets/meta-data/';
  private readonly API_PREFIX: string = 'https://api.alquran.cloud/v1/';

  constructor(private http: HttpClient) {}

  getChapters(language: string): Observable<Chapter[]> {
    return this.http
      .get<Chapter[]>(this.LOCAL_API_PREFIX + 'surah' + `/${language}.json`)
      .pipe(
        map((chapters: Chapter[]) => {
          if (language == 'ar') {
            chapters = chapters.map((chapter) => {
              chapter.translated_name = {
                ...chapter.translated_name,
                name: chapter.name_arabic,
              };
              return chapter;
            });
          }
          return chapters;
        })
      );
  }


  getAayhs(chapter_id:number, language:string, page:number, size:number):Observable<Surah[]>{
    const offset = page *size; 
    return this.http.get<Surah[]>(
      this.API_PREFIX + `surah/${chapter_id}/editions/quran-simple${language?","+language:""}?limit=${size}&offset=${offset}`
    ).pipe(map((res: any) => res.data),);
  }
}
