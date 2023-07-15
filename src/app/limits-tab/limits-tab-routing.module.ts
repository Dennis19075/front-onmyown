import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitTabPage } from './limits-tab.page';

const routes: Routes = [
  {
    path: '',
    component: LimitTabPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitTabPageRoutingModule {}
