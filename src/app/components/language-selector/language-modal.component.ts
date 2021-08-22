import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'language-modal.component.html',
  styleUrls: ['language-modal.component.scss'],
})
export class LanguageModalComponent implements OnInit {
  languages = [
    { text: 'Original', languageText: 'عربی', code: 'ar' },
    { text: 'English', languageText: 'English', code: 'en' },
    
    { text: 'Urdu', languageText: 'اردو', code: 'ur' },
    { text: 'Hindi', languageText: 'हिंदी', code: 'hi' },
  ];
  constructor(
    private translate: TranslateService,
    private modalController: ModalController
  ) {}

  ngOnInit() {}
  changeLanguage(language: any) {
    this.translate.setDefaultLang(language.code);

    this.translate.use(language.code);
    localStorage.setItem("current-language", language.code);
    this.modalController.dismiss();
  }
}
