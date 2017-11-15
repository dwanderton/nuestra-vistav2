import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { StreetViewModalPage } from '../street-view-modal/street-view-modal';

/**
 * Generated class for the PhotoModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-modal',
  templateUrl: 'photo-modal.html',
})
export class PhotoModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoModalPage');
  }

  openStreetViewModal() {
    let myModal = this.modalCtrl.create(StreetViewModalPage);
    myModal.present();
  }
}
