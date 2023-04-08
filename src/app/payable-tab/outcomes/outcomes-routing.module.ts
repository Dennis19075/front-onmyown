import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutcomesPage } from './outcomes.page';
import { UpdateOutcomeComponent } from './pages/update-outcome/update-outcome.component';

const routes: Routes = [
  {
    path: '',
    component: OutcomesPage
  },
  {
    path: 'update/:id',
    component: UpdateOutcomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomesPageRoutingModule {}
