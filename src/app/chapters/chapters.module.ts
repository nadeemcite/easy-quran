import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChaptersPage } from './chapters.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChaptersRoutingModule } from './chapters-routing.module';
import { ComponentsModule } from '../components/components.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChapterInfoComponent } from './chapter-info/chapter-info.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChaptersRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [ChaptersPage, ChapterInfoComponent],
})
export class ChaptersModule {}
