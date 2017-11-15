import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { PhotoModalPage } from '../photo-modal/photo-modal';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateModalPage');
  }
  dismissModal() {
    this.viewCtrl.dismiss();
  }
  openPhotoModal() {
    let myModal = this.modalCtrl.create(PhotoModalPage);
    myModal.present();
  }
}
