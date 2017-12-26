import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { CreateModalPage } from '../create-modal/create-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/**
* Class represents the landing page of Neustra Vista
*/
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  /**
  * Opens the camera and handles corresponding functionality of taken picture
  */
  openCamera() {
      let modalPage = new CreateModalPage(this.navCtrl, this.navParams,
                                          this.viewCtrl, this.modalCtrl);
      modalPage.takePhoto();
  }

}
