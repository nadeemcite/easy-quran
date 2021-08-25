import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Chapter } from '../models/Chapter';
import { QuranApiService } from '../services/quran-api.service';
import { ChapterInfoComponent } from './chapter-info/chapter-info.component';

@Component({
  selector: 'app-chapters',
  templateUrl: 'chapters.page.html',
  styleUrls: ['chapters.page.scss'],
})
export class ChaptersPage {
  chapters: Chapter[];

  constructor(
    private quranApiService: QuranApiService,
    private translate: TranslateService,
    private router: Router,
    private modalController: ModalController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.fetchChapters(this.translate.currentLang);
    console.log(this.translate.currentLang);

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.fetchChapters(event.lang);
    });
  }
  fetchChapters(lang) {
    this.chapters = [];
    this.quranApiService.getChapters(lang).subscribe((chapters) => {
      this.chapters = chapters;
      // console.log(chapters);
    });
  }
  async openChapter(chapter: Chapter) {
    this.nav.navigateForward('/chapter/' + chapter.id);
  }
  toArabicNumeral(en) {
    return ('' + en).replace(/[0-9]/g, function (t) {
      return '٠١٢٣٤٥٦٧٨٩'.substr(+t, 1);
    });
  }
  toUrduNumeral(en) {
    return ('' + en).replace(/[0-9]/g, function (t) {
      return '٠١٢٣۴٥٦۷٨٩'.substr(+t, 1);
    });
  }
}
