import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
//import { PhotoModalPage } from '../photo-modal/photo-modal';
import { StreetViewModalPage } from '../street-view-modal/street-view-modal';
import { Camera } from "ionic-native";

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

/**
* Class represents the camera and its corresponding functionality
*/
export class CreateModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateModalPage');
  }

  // TODO Don't think we need this anymore.
  dismissModal() {
    this.viewCtrl.dismiss();
  }

  /**
  * Opens the Google Street View API page
  */
  openStreetViewModal() {
    let myModal = this.modalCtrl.create(StreetViewModalPage);
    myModal.present();
  }

  /**
  * Sets the options for generating a photo either from a user's photo library
  * or through the user's native camera
  *
  * @param srcType a number that represents the source of the image.
  *                Requires that it is one of the following:
  *                Camera.PictureSourceType.CAMERA
  *                Camera.PictureSourceType.SAVEDPHOTOALBUM
  *                Camera.PictureSourceType.PHOTOLIBRARY
  * @return the options generated for using the user's native camera
  */
  setOptions(srcType) {
    var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        saveToPhotoAlbum : false,
        correctOrientation: true  //Corrects Android orientation quirks
    };
    return options;
  }


  /**
  * Takes a photo with the device's native camera & handles the resulting photo
  */
  takePhoto() {
    Camera.getPicture(this.setOptions(Camera.PictureSourceType.CAMERA))
          .then(imageUri => {
      this.useImage(imageUri);
      this.openStreetViewModal();
    }, error => {
      console.log("Unable to obtain picture: " + error);
    });
  }


  /**
  * Handles using the resulting image from takePhoto
  *
  * @param imgUri the image uri to use in image processing functionality etc.
  */
  useImage(imgUri) {
    // Do stuff with the newly created image
    // var elem = (<HTMLImageElement> document.getElementById('imageFile'));
    // elem.src = imgUri;
  }

}
