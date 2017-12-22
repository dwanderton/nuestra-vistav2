import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
//import { PhotoModalPage } from '../photo-modal/photo-modal';
import { StreetViewModalPage } from '../street-view-modal/street-view-modal';
import {Camera} from "ionic-native";

/**
 * Generated class for the CreateModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-modal',
  templateUrl: 'create-modal.html',
})
export class CreateModalPage {

  public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
    // this.base64Image = "https://placehold.it/150x150";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateModalPage');
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }
  /*openPhotoModal() {
    let myModal = this.modalCtrl.create(PhotoModalPage);
    console.log("opening up that photo model! Oh yea!")
    myModal.present();
  }*/
  openStreetViewModal() {
    let myModal = this.modalCtrl.create(StreetViewModalPage);
    myModal.present();
  }

  takePhoto() { // Seems to work but still crashes rather frequently.
                // It is truly odd behavior that may be caused by the ios
                // simulator. Sometimes it crashed on the street view portion.
    var options = {
        quality : 100,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit : true,
        encodingType : Camera.EncodingType.JPEG,
        targetWidth : 300,
        targetHeight : 300,
        saveToPhotoAlbum : false
    };
    console.log(JSON.stringify(options));
    Camera.getPicture(options).then(imageData => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, error => {
      console.log("ERROR!! " + JSON.stringify(error));
    });

    this.openStreetViewModal();
  }

}
