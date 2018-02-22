import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { StreetViewModalPage } from '../street-view-modal/street-view-modal';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Network } from "@ionic-native/network";


@IonicPage()
@Component({
  selector: 'page-photo-modal',
  templateUrl: 'photo-modal.html',
})
export class PhotoModalPage {

  networkType: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private camera: Camera, private network: Network,
              public platform: Platform, public alertCtrl: AlertController,
              private photoLibrary: PhotoLibrary) {
    let photoSource = navParams.get("photo_source");
    this.platform.ready().then(() => {
      console.log("Network type: " + this.network.type);
      this.networkType = this.network.type;
      if (photoSource == "LIBRARY") {
        this.getPhotoFromLibrary();
      } else {
        this.takePhoto();
      }
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoModalPage');
  }


  async takePhoto() {
    try {
      const options: CameraOptions = {
        saveToPhotoAlbum: true,
        quality: 100,
        // targetHeight: 300,
        // targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI,  // or DATA_URL
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 1  // 1 is a source type of CAMERA
      };

      const result = await this.camera.getPicture(options);

      // This was storing image in FireBase directly
      // const image = `data:image/jpeg;base64,${result}`;
      //
      // const pictures = storage().ref(('pictures/' + this.newGuid()));
      // pictures.putString(image, 'data_url');

      // let loading = this.loadingCtrl.create({
      //   spinner: 'bubbles',
      //   content: 'Loading Google Street View...',
      //   dismissOnPageChange: true
      // }).present();

      if (this.networkType != "none") {
        this.navCtrl.push(StreetViewModalPage, {"camera_image_uri": result});
      } else {
        let alert = this.alertCtrl.create({
          title: 'No Internet!',
          subTitle: ("Sorry, it seems that you have no internet. Please" +
            " come back when you are connected. Don't worry, we saved your" +
            " photo to your PhotoLibrary."),
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot("HomePage");
      }

    } catch (err) {
      console.error(err)
    }

  }

  async getPhotoFromLibrary() {
    try {
      const options: CameraOptions = {
        saveToPhotoAlbum: true,
        quality: 100,
        // targetHeight: 300,
        // targetWidth: 600,
        destinationType: this.camera.DestinationType.FILE_URI,  // or DATA_URL
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: 0  // 0 is a source type of PHOTO LIBRARY
      };

      const result = await this.camera.getPicture(options);

      // This was storing image in FireBase directly
      // const image = `data:image/jpeg;base64,${result}`;
      //
      // const pictures = storage().ref(('pictures/' + this.newGuid()));
      // pictures.putString(image, 'data_url');

      // let loading = this.loadingCtrl.create({
      //   spinner: 'bubbles',
      //   content: 'Loading Google Street View...',
      //   dismissOnPageChange: true
      // }).present();

      if (this.networkType != "none") {
        this.navCtrl.push(StreetViewModalPage, {"camera_image_uri": result});
      } else {
        let alert = this.alertCtrl.create({
          title: 'No Internet!',
          subTitle: ("Sorry, it seems that you have no internet. Please" +
            " come back when you are connected."),
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot("HomePage");
      }

    } catch (err) {
      console.error(err)
    }
  }

}
