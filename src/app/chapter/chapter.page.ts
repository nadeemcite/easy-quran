import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Surah } from '../models/Chapter';
import { QuranApiService } from '../services/quran-api.service';

@Component({
  selector: 'app-chapter',
  templateUrl: 'chapter.page.html',
  styleUrls: ['chapter.page.scss'],
})
export class ChapterPage implements OnInit {
  LANGUAGE_CODE = {
    hi: 'hi.hindi',
    ur: 'ur.ahmedali',
    ar: null,
    en: 'en.ahmedali',
  };
  surah: Surah;
  tranSurah: Surah;
  currentPage = 0;
  size = 9;

  constructor(
    private apiService: QuranApiService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.fetchSurah(this.translate.currentLang);
    this.fetchSurah('ar');

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);

      this.fetchSurah(event.lang);
    });
  }

  fetchSurah(lang) {
    this.activatedRoute.params.subscribe((params) => {
      this.apiService
        .getAayhs(
          params.chapter_id,
          this.LANGUAGE_CODE[lang],
          this.currentPage,
          this.size
        )
        .subscribe((surah) => {
          if (lang == 'ar') {
            this.surah = surah;
          } else {
            this.tranSurah = surah;
          }
          this.surah?.ayahs.map((res, index) => {
            if (this.tranSurah?.ayahs) {
              res['trans'] = this.tranSurah.ayahs[index];
              return res;
            }
          });
          console.log(this.surah);
        });
    });
  }
  back() {
    this.nav.back();
  }

  next() {
    this.currentPage++;
    this.fetchSurah(this.translate.currentLang);
  }
  previous() {
    this.currentPage--;
    this.fetchSurah(this.translate.currentLang);
  }
}
