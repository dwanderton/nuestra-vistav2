import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewModalPage');
    this.initMap();
  }

  initMap(){
    let latLng = new google.maps.LatLng(37.869260, -122.254811);
    let mapOptions = {
      position: latLng,
      pov: {heading: 165, pitch: 0},
      zoom: 1
    };

    this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);

  }

}
