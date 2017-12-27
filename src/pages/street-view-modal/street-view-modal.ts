import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ShareModalPage } from '../share-modal/share-modal';
import { Geolocation } from 'ionic-native';
declare var google;

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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewModalPage');
    this.initMap();
  }

  initMap() {
    Geolocation.getCurrentPosition().then((resp) => {

    console.log("lat, long: ", resp.coords.latitude, resp.coords.longitude)
    // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    var mapOptions;

    function generatePanoramaSettings(callback) {
      var streetviewService = new google.maps.StreetViewService;
      streetviewService.getPanorama({
           location: {lat: resp.coords.latitude, lng: resp.coords.longitude},
           preference: google.maps.StreetViewPreference.NEAREST,
           radius: 100},
          function(result, status) {
              console.log("new lat: ", result.location.latLng.lat());
              console.log("new long: ", result.location.latLng.lng());
              mapOptions = {
                position: result.location.latLng,
                pov: {heading: 165, pitch: 0},
                pano: "User's Location",
                zoom: 1
              };

              console.log("calling the callback!");
              callback();
          });
      }

      function loadPanorama() {
          this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);
          console.log("Street View Generated")
      }

      generatePanoramaSettings( function() { loadPanorama(); });

      // console.log("User's location:\nlatitude: ", resp.coords.latitude, "\nlongitude: ", resp.coords.longitude)
      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      // let mapOptions = {
      //   position: latLng,
      //   pov: {heading: 165, pitch: 0},
      //   zoom: 1
      // };
      // this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  openShareModal() {
    let myModal = this.modalCtrl.create(ShareModalPage);
    myModal.present();
  }

}
