import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PhotoModalPage} from "../photo-modal/photo-modal";


@IonicPage()
@Component({
  selector: 'page-camera-library-popover',
  templateUrl: 'camera-library-popover.html',
})
export class CameraLibraryPopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraLibraryPopoverPage');
  }

  openCamera() {
    console.log("Opening PhotoModalPage");
    this.navCtrl.push(PhotoModalPage, {"photo_source": "CAMERA"});
  }

  openLibrary() {
    console.log("Opening photo library...");
    this.navCtrl.push(PhotoModalPage, {"photo_source": "LIBRARY"});
  }

}
