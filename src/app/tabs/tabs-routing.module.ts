import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'payable',
        loadChildren: () => import('../payable-tab/payable-tab.module').then(m => m.PayablePageModule)
      },
      {
        path: 'cart-simulation',
        loadChildren: () => import('../cart-simulation/cart-simulation.module').then(m => m.CartSimulationPageModule)
      },
      {
        path: 'limits',
        loadChildren: () => import('../limits-tab/limits-tab.module').then(m => m.LimitTabPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/payable',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/payable',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
