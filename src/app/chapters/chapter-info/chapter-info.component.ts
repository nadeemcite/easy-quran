import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Chapter } from 'src/app/models/Chapter';
import { QuranApiService } from 'src/app/services/quran-api.service';

@Component({
  selector: 'app-chapter-info',
  templateUrl: 'chapter-info.component.html',
})
export class ChapterInfoComponent implements OnInit {
  @Input() chapter: Chapter;

  constructor(
    private modalController: ModalController,
    private quranApiService: QuranApiService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // this.quranApiService
    //   .getChapterInfo(this.chapter.number, this.translate.currentLang)
    //   .subscribe((chapterInfo: ChapterInfo) => {
    //     console.log(chapterInfo);
    //   });
  }
}
