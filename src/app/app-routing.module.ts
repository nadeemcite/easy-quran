import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./chapters/chapters.module').then(m => m.ChaptersModule)
  },
  {
    path: 'chapter',
    loadChildren: () => import('./chapter/chapter.module').then(m => m.ChapterModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
