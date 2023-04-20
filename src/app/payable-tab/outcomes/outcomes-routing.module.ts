import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutcomesPage } from './outcomes.page';
import { UpdateOutcomeComponent } from './pages/update-outcome/update-outcome.component';
import { OutcomesPerdayComponent } from './pages/body-calendar-output/outcomes-perday/outcomes-perday.component';

const routes: Routes = [
  {
    path: '',
    component: OutcomesPage
  },
  {
    path: 'update/:id',
    component: UpdateOutcomeComponent
  },
  {
    path: 'outcomes-per-day/:date',
    component: OutcomesPerdayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutcomesPageRoutingModule {}
