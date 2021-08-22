import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageModalComponent } from './language-selector/language-modal.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [
        LanguageSelectorComponent
    ],
    declarations: [LanguageSelectorComponent,LanguageModalComponent],
    providers: [],
})
export class ComponentsModule { }
