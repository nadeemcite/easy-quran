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
  currentPage = 0;
  size=3;
  constructor(
    private apiService: QuranApiService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private nav:NavController
  ) {}

  ngOnInit() {
    

    this.fetchSurah(this.translate.currentLang);

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.fetchSurah(event.lang);
    });
  }

  fetchSurah(lang){
    this.activatedRoute.params.subscribe((params) => {
        this.apiService
          .getAayhs(
            params.chapter_id,
            this.LANGUAGE_CODE[lang],
            this.currentPage,
            this.size
          )
          .subscribe((surah) => {
            this.surah = surah;
          });
      });
  }
  back(){
    this.nav.back();
  }

  next(){
      this.currentPage++;
      this.fetchSurah(this.translate.currentLang);
  }
  previous(){
    this.currentPage--;
    this.fetchSurah(this.translate.currentLang);
  }
}
