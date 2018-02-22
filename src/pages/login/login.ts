import { Component } from '@angular/core';
import {
  IonicPage, NavController, NavParams,
  ToastController
} from 'ionic-angular';

import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth, public toast: ToastController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  async login(user: User) {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((aUser) => {
          if (aUser.emailVerified) {
            this.navCtrl.setRoot('ProfilePage');
          } else {
            console.log('Unverified e-mail address');
            this.toast.create({
              message: ('Please verify your email address.'), // TODO : button
              showCloseButton: true,
              closeButtonText: 'Ok'
            }).present();
          }
        }).catch((error) => {
          console.log("Error while logging in.");
          this.toast.create({
            message: ('Invalid email or password.'), // TODO : button
            showCloseButton: true,
            closeButtonText: 'Ok'
          }).present();
      });
  }


  resetPassword(email) {
    this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
      })
  }


  register() {
    this.navCtrl.push('RegisterPage');
  }

  createPhotoOffline() {
    console.log("Create photo offline")
  }

}
