import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { ShareModalPage } from '../share-modal/share-modal';
import { Geolocation } from 'ionic-native';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

declare var google;

@IonicPage()
@Component({
  selector: 'page-street-view-modal',
  templateUrl: 'street-view-modal.html',
})

export class StreetViewModalPage {

  @ViewChild('map') mapElement;
  map: any;
  panorama: any;
  cameraImageURI: string = '';
  storageDirectory: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public platform: Platform, public viewCtrl: ViewController,
              public modalCtrl: ModalController, private transfer: FileTransfer,
              private file: File) {

    this.cameraImageURI = navParams.get("camera_image_uri");
    this.initMap();
    this.openShareModal = this.openShareModal.bind(this);

    this.platform.ready().then(() => {

        if (!this.platform.is('cordova')) {
          return false;
        }

        if (this.platform.is('ios')) {
          this.storageDirectory = this.file.documentsDirectory;
        } else if (this.platform.is('android')) {
          this.storageDirectory = this.file.dataDirectory;
        } else {
          return false;
        }

      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad StreetViewModalPage');
  }


  /**
  * Creates the map options for panorama generation. This includes adjusting the coordinate
  * position of a user to the nearest available street view. Following creation of the settings,
  * it generates the street view on a user's device.
  *
  * @param userLocation a JSON object whose keys are 'lat' and 'lng' and whose values are
  *                     the corresponding latitude and longitude respectively
  */
  generatePanorama(userLocation): void {
    var self = this;
    var streetviewService = new google.maps.StreetViewService;
    streetviewService.getPanorama({
      location: userLocation,
      preference: google.maps.StreetViewPreference.NEAREST,
      radius: 100},
      function(result, status) {
        console.log("Adjusted latitude: ", result.location.latLng.lat(),
                    "\nAdjusted longitude: ", result.location.latLng.lng());
        self.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
          position: result.location.latLng,
          pov: {heading: 165, pitch: 0},
          zoom: 1
        });
        self.bindEvents();
      });
  }


  bindEvents() {
  	var self = this;
    this.panorama.addListener('pano_changed', function() {
        var panoCell = document.getElementById('pano-cell');
        panoCell.innerHTML = self.panorama.getPano();
    });

    this.panorama.addListener('links_changed', function() {
        var linksTable = document.getElementById('links_table');
        while (linksTable.hasChildNodes()) {
          linksTable.removeChild(linksTable.lastChild);
        }
        var links = self.panorama.getLinks();
        for (var i in links) {
          var row = document.createElement('tr');
          linksTable.appendChild(row);
          var labelCell = document.createElement('td');
          labelCell.innerHTML = '<b>Link: ' + i + '</b>';
          var valueCell = document.createElement('td');
          valueCell.innerHTML = links[i].description;
          linksTable.appendChild(labelCell);
          linksTable.appendChild(valueCell);
        }
    });

    this.panorama.addListener('position_changed', function() {
        var positionCell = document.getElementById('position-cell');
        positionCell.firstChild.nodeValue = self.panorama.getPosition() + '';
    });

    this.panorama.addListener('pov_changed', function() {
        var headingCell = document.getElementById('heading-cell');
        var pitchCell = document.getElementById('pitch-cell');
        headingCell.firstChild.nodeValue = self.panorama.getPov().heading + '';
        pitchCell.firstChild.nodeValue = self.panorama.getPov().pitch + '';
    });
  }


  /**
  * Uses a device's native geolocation capabilities to get the user's current position
  *
  * @return a JSON object whose keys are 'lat' and 'lng' and whose calues are the corresponding
  *         latitude and longitude respectively
  */
  getLocation(callback): void {
    Geolocation.getCurrentPosition().then((position) => {
      console.log("Latitude: ", position.coords.latitude, "\nLongitude: ", position.coords.longitude);
      callback({lat: position.coords.latitude, lng: position.coords.longitude});
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /**
  * Initialize a Google Street View Panorama image
  */
  initMap() {
    this.getLocation(this.generatePanorama.bind(this));
  }

  /**
  * Generates a URL to query the Google Maps API for a static image of a location
  *
  * @param lat the latitude of the static image to query
  * @param lng the longitude of the static image to query
  * @param heading indicates the compass heading of the camera
  * @param pitch specifies the up or down angle of the camera relative to the street
  * @return a string that is the URL of a statically generated image of a location
  */
  generateStaticMapsURL(lat, lng, heading, pitch): string {
    var url = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    url += lat + "," + lng;
    url += "&heading=" + heading;
    url += "&pitch=" + pitch;
    url += "&key=AIzaSyAPQkL_M88WrEy3Phj7qAS7zTEr8TFDLe0";  // TODO : Privatize
    return url;
  }


  downloadStreetViewImage() {

    console.log("Downloading Street View Image ...");

    let lat = this.panorama.getPosition().lat();
    let lng = this.panorama.getPosition().lng();
    let heading = this.panorama.getPov().heading;
    let pitch = this.panorama.getPov().pitch;
    const streetViewURL = this.generateStaticMapsURL(lat, lng, heading, pitch);

    const fileTransfer: FileTransferObject = this.transfer.create();

    fileTransfer.download(streetViewURL, this.storageDirectory + 'file.png').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.navCtrl.setRoot(ShareModalPage, {
        "camera_image_uri": this.cameraImageURI,
        "street_view_photo_uri": entry.toURL()
      });
    }, (err) => {
      console.error(err);
    });

  }


  openShareModal() {
    this.downloadStreetViewImage();
  }

}
