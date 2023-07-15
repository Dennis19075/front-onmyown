import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayableTabPage } from './payable-tab.page';

import { PayablePageRoutingModule } from './payable-tab-routing.module';
import { NgChartsModule } from "ng2-charts";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    PayablePageRoutingModule
  ],
  providers: [NgChartsModule],
  declarations: [PayableTabPage]
})
export class PayablePageModule {}
