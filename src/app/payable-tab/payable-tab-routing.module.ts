import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayableTabPage } from './payable-tab.page';

const routes: Routes = [
  {
    path: '',
    component: PayableTabPage,
  },
  {
    path: 'outcomes',
    loadChildren: () => import('./outcomes/outcomes.module').then( m => m.OutcomesPageModule)
  },
  {
    path: 'incomes',
    loadChildren: () => import('./incomes/incomes.module').then( m => m.IncomesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
