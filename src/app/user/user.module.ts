import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';
import { UserPage } from './user.page';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    UserPageRoutingModule
  ],
  declarations: [UserPage, UserDetailsComponent]
})
export class UserPageModule {}
