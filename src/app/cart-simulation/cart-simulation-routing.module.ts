import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartSimulationPage } from './cart-simulation.page';

const routes: Routes = [
  {
    path: '',
    component: CartSimulationPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartSimulationPageRoutingModule {}
