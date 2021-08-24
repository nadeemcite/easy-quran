import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, PopoverController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EditionMapping, LANGUAGE_CODE, Surah } from '../models/Chapter';
import { QuranApiService } from '../services/quran-api.service';
import { ChangeAyahCountComponent } from './change-size/change-ayah-count.component';

@Component({
  selector: 'app-chapter',
  templateUrl: 'chapter.page.html',
  styleUrls: ['chapter.page.scss'],
})
export class ChapterPage implements OnInit {
  surah: Surah;
  languageSurah: Surah;
  translitrationSurah: Surah;
  audioSurah: Surah;
  mainAudioSurah: Surah;
  currentPage = 0;
  size;

  @ViewChild('content', {static: true})
  content;

  constructor(
    private apiService: QuranApiService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private nav: NavController,
    private popoverController: PopoverController
  ) {
    const ayahCount = localStorage.getItem('ayah-count');
    if (ayahCount !== null) {
      this.size = Number(ayahCount);
    } else {
      this.size = 3;
    }
  }

  ngOnInit() {
    this.fetchSurah(this.translate.currentLang);
    this.fetchSurah('ar');

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
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
              LANGUAGE_CODE[lang],
              this.currentPage,
              this.size
            )
            .subscribe((surahs) => {
              this.surah = null;
              this.languageSurah = null;
              this.translitrationSurah = null;
              this.audioSurah = null;
              this.mainAudioSurah = null;
              if (surahs.length > 0) {
                surahs.forEach((surah) => {
                  switch (EditionMapping[surah.edition.identifier]) {
                    case 'main':
                      this.surah = surah;
                      break;
                    case 'translation':
                      this.languageSurah = surah;
                      break;
                    case 'translitration':
                      this.translitrationSurah = surah;
                      break;
                    case 'audio':
                      this.audioSurah = surah;
                      break;
                    case 'main-audio':
                      this.mainAudioSurah = surah;
                      break;
                  }
                });
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
        currentNum: this.size,
      },
    });
    await popover.present();
    popover.onDidDismiss().then((data) => {
      this.size = Number(data.data);
      localStorage.setItem('ayah-count', this.size);
      this.currentPage = 0;
      this.ngOnInit();
    });
  }
}
