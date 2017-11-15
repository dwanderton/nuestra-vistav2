import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ShareModalPage } from '../share-modal/share-modal';

/**
 * Generated class for the StreetViewModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-street-view-modal',
  templateUrl: 'street-view-modal.html',
})
export class StreetViewModalPage {

  @ViewChild('map') mapElement;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewModalPage');
    this.initMap();
  }

  initMap(){
    let latLng = new google.maps.LatLng(18.2661783, -66.7217359);
    let mapOptions = {
      position: latLng,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };

    this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);

  }

  openShareModal() {
    let myModal = this.modalCtrl.create(ShareModalPage);
    myModal.present();
  }

}
