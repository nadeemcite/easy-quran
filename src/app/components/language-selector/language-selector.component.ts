import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LanguageModalComponent } from './language-modal.component';

@Component({
    selector: 'app-language-selector',
    templateUrl: 'language-selector.component.html'
})

export class LanguageSelectorComponent implements OnInit {
    constructor(private modalController: ModalController) { }

    ngOnInit() { }

    async openLanguageSelector(){
        const modal = await this.modalController.create({
            component: LanguageModalComponent,
            cssClass: 'my-custom-class'
          });
          return await modal.present();
    }
}