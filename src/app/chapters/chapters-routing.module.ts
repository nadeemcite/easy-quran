import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaptersPage } from './chapters.page';

const routes: Routes = [
  {
    path: '',
    component: ChaptersPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChaptersRoutingModule {}
