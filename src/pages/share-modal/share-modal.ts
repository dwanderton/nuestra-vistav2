import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home'
/**
 * Generated class for the ShareModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html',
})
export class ShareModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  homePage = HomePage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareModalPage');
  }

}
