import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
  PopoverController,
} from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Surah } from '../models/Chapter';
import { QuranApiService } from '../services/quran-api.service';
import { ChangeAyahCountComponent } from './change-size/change-ayah-count.component';

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
  languageSurah: Surah;
  currentPage = 0;
  size;

  @ViewChild('content')
  content;

  constructor(
    private apiService: QuranApiService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private nav: NavController,
    private popoverController: PopoverController
  ) {
    const ayahCount = localStorage.getItem('ayah-count');
    if(ayahCount!==null){
      this.size = ayahCount;
    }else{
      this.size = 3;
    }
  }

  ngOnInit() {
    this.fetchSurah(this.translate.currentLang);
    this.fetchSurah('ar');

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      console.log(event.lang);

      this.fetchSurah(event.lang);
    });
  }

  fetchSurah(lang): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.activatedRoute.params.subscribe(
        (params) => {
          this.apiService
            .getAayhs(
              params.chapter_id,
              this.LANGUAGE_CODE[lang],
              this.currentPage,
              this.size
            )
            .subscribe((surah) => {
              this.surah = surah[0];
              if (surah[1]) {
                this.languageSurah = surah[1];
              } else {
                this.languageSurah = null;
              }
              resolve(true);
            });
        },
        (err) => {
          reject(false);
        }
      );
    });
  }
  back() {
    this.nav.back();
  }

  next() {
    this.currentPage++;
    this.fetchSurah(this.translate.currentLang).then(() => {
      this.content.scrollToTop(200);
    });
  }
  previous() {
    this.currentPage--;
    this.fetchSurah(this.translate.currentLang).then(() => {
      this.content.scrollToTop(200);
    });
  }

  async changeAyahCount() {
    const popover = await this.popoverController.create({
      component: ChangeAyahCountComponent,
      cssClass: 'my-custom-class',
      translucent: false,
      componentProps: {
        currentNum: this.size
      }
    });
    await popover.present();
    popover.onDidDismiss().then((data) => {
      this.size = data.data;
      localStorage.setItem('ayah-count', this.size);
      this.currentPage = 0;
      this.ngOnInit();
    });
  }
}
