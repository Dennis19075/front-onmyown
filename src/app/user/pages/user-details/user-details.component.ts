import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async presentAlertLogout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      subHeader: 'Are you sure want to logout?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (res) => {
            console.log("LOGOUT ABORTED!");
          }
        },
        {
          text: 'Ok',
          role: 'ok',
          handler: (res) => {
            console.log("LOGOUT!");
          }
        },
      ],
    });

    await alert.present();
    
  }

}
