import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LimitTabPage } from './limits-tab.page';

import { LimitTabPageRoutingModule } from './limits-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LimitTabPageRoutingModule
  ],
  declarations: [LimitTabPage]
})
export class LimitTabPageModule {}
