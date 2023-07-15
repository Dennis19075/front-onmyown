import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayableTabPage } from './payable-tab.page';

import { Tab1PageRoutingModule } from './payable-tab-routing.module';
import { NgChartsModule } from "ng2-charts";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    Tab1PageRoutingModule
  ],
  providers: [NgChartsModule],
  declarations: [PayableTabPage]
})
export class PayablePageModule {}
