import { Component } from '@angular/core';
import { Platform, NavController, NavParams, ViewController, ModalController, ToastController, PopoverController } from 'ionic-angular';
import { CreateModalPage } from '../create-modal/create-modal';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database';
import { storage } from 'firebase';
import { Network } from '@ionic-native/network';

import { Profile } from '../../models/profile';
import { CameraLibraryPopoverPage } from "../camera-library-popover/camera-library-popover";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
* Class represents the landing page of Nuestra Vista
*/
export class HomePage {

  profileData: AngularFireObject<Profile>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public popoverCtrl: PopoverController, private afAuth: AngularFireAuth,
              private afDatabase: AngularFireDatabase, private toast: ToastController) {
  }

  ionViewWillLoad() {
    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: "Welcome to Nuestra Vista!",
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(('profile/' + data.uid))
      }
    });
  }


  presentPopover() {
    let popover = this.popoverCtrl.create(CameraLibraryPopoverPage);
    popover.present();
  }

}
