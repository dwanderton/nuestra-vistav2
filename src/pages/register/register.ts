import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';

import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          this.toast.create({
            message: ('A verification email was sent to your inbox. Please' +
              ' verify your email and return to the login page.'),
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
        })
    });
  }


  async register(user: User) {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          this.sendEmailVerification();
        })
        .catch((err) => {
          console.error(err);
        });
  }

}
