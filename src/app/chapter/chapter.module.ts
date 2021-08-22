import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ComponentsModule } from '../components/components.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChapterRoutingModule } from './chapter-routing.module';
import { ChapterPage } from './chapter.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ChapterRoutingModule,
    ComponentsModule,
    TranslateModule,
  ],
  declarations: [ChapterPage],
})
export class ChapterModule {}
