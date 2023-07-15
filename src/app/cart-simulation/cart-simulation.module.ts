import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartSimulationPage } from './cart-simulation.page';

import { CartSimulationPageRoutingModule } from './cart-simulation-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CartSimulationPageRoutingModule
  ],
  declarations: [CartSimulationPage]
})
export class CartSimulationPageModule {}
