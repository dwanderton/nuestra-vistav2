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

  /**
  * Uses a device's native geolocation capabilities to get the user's current position
  *
  * @return a JSON object whose keys are 'lat' and 'lng' and whose calues are the corresponding
  *         latitude and longitude respectively
  */
  getLocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log("Latitude: ", resp.coords.latitude, "\nLongitude: ", resp.coords.longitude);
      return {lat: resp.coords.latitude, lng: resp.coords.longitude};
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
  * Loads a Google street view panorama on a user's device according to the options passed in
  *
  * @param mapOptions a JSON object that specifies the street view's position, pov, zoom etc.
  *                   requires that the following keys be the object with appropariate values,
  *                   'position', 'pov' including a value with 'heading' and 'pitch' keys
  */
  loadPanorama(mapOptions): void {
    console.log("Loading the panorama...");
    this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);
    console.log("Panorama created and loaded.");
  }

  /**
  * Creates the map options for panorama generation. This includes adjusting the coordinate
  * position of a user to the nearest available street view. Following creation of the settings,
  * it generates the street view on a user's device.
  *
  * @param userLocation a JSON object whose keys are 'lat' and 'lng' and whose calues are
  *                     the corresponding latitude and longitude respectively
  */
  generatePanorama(userLocation): void {
    var streetviewService = new google.maps.StreetViewService;
    streetviewService.getPanorama({
      location: userLocation,
      preference: google.maps.StreetViewPreference.NEAREST,
      radius: 100},
      function(result, status) {
        console.log("Adjusted latitude: ", result.location.latLng.lat(),
                    "\nAdjusted longitude: ", result.location.latLng.lng());
        let mapOptions = {
          position: result.location.latLng,
          pov: {heading: 165, pitch: 0},
          pano: "User's Location",
          zoom: 1
        };

        this.loadPanorama(mapOptions);
      });
  }

  /**
  * Initialize a Google Street View Panorama image
  */
  initMap(): void {
    this.generatePanorama(this.getLocation);
      // ~~~~~ THE OLD CODE ~~~~~~
      // console.log("User's location:\nlatitude: ", resp.coords.latitude, "\nlongitude: ", resp.coords.longitude)
      // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      // let mapOptions = {
      //   position: latLng,
      //   pov: {heading: 165, pitch: 0},
      //   zoom: 1
      // };
      // this.map - new google.maps.StreetViewPanorama(this.mapElement.nativeElement, mapOptions);
  }

  openShareModal() {
    let myModal = this.modalCtrl.create(ShareModalPage);
    myModal.present();
  }

}
