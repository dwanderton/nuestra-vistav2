import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Profile } from '../../models/profile';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase} from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile = {} as Profile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object(('profile/' + auth.uid)).set(this.profile)
        .then(() => {this.navCtrl.setRoot(HomePage)})
    })
  }

}
