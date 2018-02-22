import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

import { HomePage } from '../home/home';
import {AngularFireDatabase} from "angularfire2/database";
import { storage } from "firebase";

@IonicPage()
@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html',
})
export class ShareModalPage {

  cameraImageURI: string = '';
  streetViewPhotoURI: string = '';
  PICTURE_WIDTH: number = 640;
  PICTURE_HEIGHT: number = 480;
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  pano: HTMLImageElement;
  x: number = 0;
  y: number = 0;



  constructor(private platform: Platform, public navCtrl: NavController,
              public navParams: NavParams, private afDatabase: AngularFireDatabase) {
    // this.cameraImageURI = navParams.get("camera_image_uri").slice(7);
    // this.streetViewPhotoURI = navParams.get("street_view_photo_uri").slice(7);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ShareModalPage');
    // console.log("street view in ion did load: " + this.streetViewPhotoURI);
    // let streetView = this.streetViewPhotoURI;
    // this.setBaseCameraImage(streetView);

    // let lHeight = document.getElementById("left-image").clientHeight;
    // let lWidth = document.getElementById("left-image").clientWidth;
    // let rHeight = document.getElementById("right-image").getAttribute("height");
    // let rWidth = document.getElementById("right-image").getAttribute("width");
    // document.getElementById("slider-img1").setAttribute("src", "../../assets/imgs/raw_ios_photo.jpg");
    // document.getElementById("slider-img2").setAttribute("src", "../../assets/imgs/streetview-example.jpg");
    this.compileImages();
  }


  //***************************************************************
  // IMAGE EDITING
  //***************************************************************


  compileImages() {
    let left = new Image();
    left.src = "../../assets/imgs/raw_ios_photo.jpg"; //this.cameraImageURI; //
    left.width = 640;
    left.style.width = "640px";
    left.height = 480;
    left.style.height = "480px";

    let right = new Image();
    right.src = "../../assets/imgs/streetview-example.jpg"; //this.streetViewPhotoURI; //

    this.canvas = <HTMLCanvasElement> document.getElementById("pano-canvas");
    this.canvas.height = 480;
    this.canvas.width = 1280;
    this.canvas.style.height = "480px";
    this.canvas.style.width = "1280px";

    this.context = this.canvas.getContext("2d");
    console.log("CANVAS!: " + this.canvas.height);
    console.log("CANVAS!: " + this.canvas.width);

    right.onload = () => {
      console.log("Right is loaded!");

      left.onload = () => {

        console.log("drawing right image!");
        console.log(right.height);
        console.log(right.width);
        this.context.drawImage(<any> right, 640, 0, 640, 480);

        console.log("drawing left image!");
        console.log(left.height);
        console.log(left.width);
        this.context.drawImage(<any> left, 0, 0, 640, 480);

        let composite = this.canvas.toDataURL("image/png");
        document.getElementById("card-image").setAttribute("src", composite);

      };
    };
  }

  //
  // setBaseCameraImage(sv) {
  //   console.log("Inside set base camera image!");
  //   console.log("base sv: " + sv);
  //   // "../../assets/imgs/simon-test.jpg"
  //   document.getElementById("camera-image").setAttribute("src", this.cameraImageURI);
  //   // document.getElementById("camera-image").onload;
  //   this.display(sv);
  // }
  //
  // display(sv) {
  //   console.log("Inside display!");
  //   console.log("display sv: " + sv);
  //   document.getElementById("test").setAttribute("src", sv);
  //   console.log("creating the pano image!");
  //   this.pano = new Image();
  //   console.log("pano src before: " + sv);
  //   this.pano.src = sv; // "../../assets/imgs/garfunkel-test.jpg";
  //   console.log("pano src: " + this.pano.getAttribute("src"));
  //
  //   console.log("grabbing the canvas!");
  //   this.canvas = <HTMLCanvasElement> document.getElementById("pano-canvas");
  //   this.context = this.canvas.getContext("2d");
  //   this.context.globalAlpha = 0.55;
  //
  //   console.log("once pano is loaded...");
  //   this.pano.onload = () => {
  //     console.log("pano loaded!");
  //
  //     console.log("draw image!");
  //     this.context.drawImage(<any> this.pano, this.x, this.y);
  //   };
  // };
  //
  // captureCanvas() {
  //   this.context.globalAlpha = 1;  // resetting the opacity
  //   this.context.drawImage(<any> this.pano, this.x, this.y);
  //
  //   console.log("converting image for firebase to base64");
  //   let canvasImage = this.canvas.toDataURL("image/png");  // .replace(/^data:image\/(png|jpg);base64,/, "");
  //   console.log("done converting image to base64");
  //   const pictures = storage().ref('pictures/test');
  //   pictures.putString(canvasImage, 'data_url');
  //   console.log("put image in database!");
  //
  //   let img1 = new Image();
  //   img1.src = this.cameraImageURI;  // "../../assets/imgs/simon-test.jpg";
  //
  //   console.log("img1 created...");
  //
  //   let img2 = new Image();
  //   img2.src = canvasImage;
  //
  //   console.log("grabbing the canvas!");
  //   let mashupCanvas = <HTMLCanvasElement> document.getElementById("mashup-canvas");
  //   let ctx = mashupCanvas.getContext("2d");
  //
  //   console.log("loading images on canvas...");
  //   img1.onload = () => {
  //     img2.onload = () => {
  //       console.log("drawing images...");
  //       ctx.drawImage(<any> img1, 0, 0, 400, 300);
  //       ctx.drawImage(<any> img2, 400, 0, 400, 300);
  //     }
  //   };
  // }
  //
  // left() {
  //   this.x -= 5;
  //   this.context.clearRect(0, 0, 300, 400);
  //   this.context.drawImage(<any> this.pano, this.x, this.y);
  // }
  //
  // right() {
  //   this.x += 5;
  //   this.context.clearRect(0, 0, 300, 400);
  //   this.context.drawImage(<any> this.pano, this.x, this.y);
  // }
  //
  // up() {
  //   this.y -= 5;
  //   this.context.clearRect(0, 0, 300, 400);
  //   this.context.drawImage(<any> this.pano, this.x, this.y);
  // }
  //
  // down() {
  //   this.y += 5;
  //   this.context.clearRect(0, 0, 300, 400);
  //   this.context.drawImage(<any> this.pano, this.x, this.y);
  // }


  //***************************************************************
  // SOCIAL SHARING
  //***************************************************************


  clickMainFAB() {
    console.log('Clicked open social menu');
  }


  // TODO: add catch for social app not exisiting
  /**
  * Shares content via a user's Twitter account
  *
  * @param message a string that is the message to accompany the social media post
  * @param image a string that is the image to share via a social media post
  * @param url a string that is a url to share via a social media post
  */
  shareViaTwitter(message, image, url): void {
    console.log("Sharing via Twitter...");
    this.platform.ready().then(() => {
      SocialSharing.shareViaTwitter(message, image, url).then(() => {
        alert("Success");
      }).catch((error) => {
        console.log("Error while sharing to Twitter", error);
      });
    });
  }

  // TODO: add catch for social app not exisiting
  /**
  * Shares content via a user's Facebook account
  *
  * @param message a string that is the message to accompany the social media post
  * @param image a string that is the image to share via a social media post
  * @param url a string that is a url to share via a social media post
  */
  shareViaFacebook(message, image, url): void {
    console.log("Sharing via Facebook...");
    this.platform.ready().then(() => {
      SocialSharing.shareViaFacebook(message, image, url).then(() => {
        alert("Success");
      }).catch((error) => {
        console.log("Error while sharing to Facebook", error);
      });
    });
  }

  // TODO: add catch for social app not exisiting
  /**
  * Shares content via a user's Instagram account
  *
  * @param message a string that is the message to accompany the social media post
  * @param image a string that is the image to share via a social media post
  */
  shareViaInstagram(message, image): void {
    console.log("Sharing via Instagram...");
    this.platform.ready().then(() => {
      SocialSharing.shareViaInstagram(message, image).then(() => {
        alert("Success");
      }).catch((error) => {
        console.log("Error while sharing to Instagram", error);
      });
    });
  }

  // TODO: add catch for social app not exisiting
  /**
  * Shares content via a user's What's App account
  *
  * @param message a string that is the message to accompany the social media post
  * @param image a string that is the image to share via a social media post
  * @param url a string that is a url to share via a social media post
  */
  shareViaWhatsApp(message, image, url): void {
    console.log("Sharing via What's App...");
    this.platform.ready().then(() => {
      SocialSharing.shareViaWhatsApp(message, image, url).then(() => {
        alert("Success");
      }).catch((error) => {
        console.log("Error while sharing to What's App", error);
      });
    });
  }


  /**
   * Returns the user to the homepage.
   */
  returnHome(): void {
    this.navCtrl.setRoot(HomePage);
  }

}
