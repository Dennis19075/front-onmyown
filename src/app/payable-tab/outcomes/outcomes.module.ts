import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutcomesPageRoutingModule } from './outcomes-routing.module';

import { OutcomesPage } from './outcomes.page';
import { UpdateOutcomeComponent } from './update-outcome/update-outcome.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OutcomesPageRoutingModule
  ],
  declarations: [OutcomesPage,UpdateOutcomeComponent]
})
export class OutcomesPageModule {}
