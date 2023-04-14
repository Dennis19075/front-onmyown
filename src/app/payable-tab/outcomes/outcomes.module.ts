import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutcomesPageRoutingModule } from './outcomes-routing.module';

import { OutcomesPage } from './outcomes.page';

import { HeaderOutcomesComponent } from './pages/header-outcomes/header-outcomes.component';
import { BodyOutcomesComponent } from './pages/body-outcomes/body-outcomes.component';
import { UpdateOutcomeComponent } from './pages/update-outcome/update-outcome.component';
import { BodyCalendarOutputComponent } from './pages/body-calendar-output/body-calendar-output.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutcomesPageRoutingModule
  ],
  declarations: [OutcomesPage, UpdateOutcomeComponent, HeaderOutcomesComponent, BodyOutcomesComponent, BodyCalendarOutputComponent]
})
export class OutcomesPageModule {}
