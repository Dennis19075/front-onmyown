import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutcomesPageRoutingModule } from './incomes-routing.module';

import { IncomesPage } from './incomes.page';

// import { HeaderOutcomesComponent } from './pages/header-outcomes/header-outcomes.component';
// import { BodyOutcomesComponent } from './pages/body-outcomes/body-outcomes.component';
// import { UpdateOutcomeComponent } from './pages/update-outcome/update-outcome.component';
// import { BodyCalendarOutputComponent } from './pages/body-calendar-output/body-calendar-output.component';
// import { OutcomesPerdayComponent } from './pages/body-calendar-output/outcomes-perday/outcomes-perday.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BodyIncomesComponent } from './pages/body-incomes/body-incomes.component';
import { UpdateIncomeComponent } from './pages/update-income/update-income.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutcomesPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [IncomesPage, BodyIncomesComponent, UpdateIncomeComponent] 
})
export class IncomesPageModule {}
