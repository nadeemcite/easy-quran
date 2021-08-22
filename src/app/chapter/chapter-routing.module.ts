import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterPage } from './chapter.page';

const routes: Routes = [
  {
    path: '',
    component: ChapterPage,
  },
  {
    path: ':chapter_id',
    component: ChapterPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterRoutingModule {}
