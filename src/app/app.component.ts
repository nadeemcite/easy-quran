import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {}
  ngOnInit() {
    if (localStorage.getItem('current-language') !== null) {
      this.translate.setDefaultLang(localStorage.getItem('current-language'));
      this.translate.use(localStorage.getItem('current-language'));
    } else {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('current-language', 'en');
    }
  }
}
