import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayableTabPage } from './payable-tab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './payable-tab-routing.module';
import { NgChartsModule } from "ng2-charts";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
  providers: [NgChartsModule],
  declarations: [PayableTabPage]
})
export class Tab1PageModule {}
