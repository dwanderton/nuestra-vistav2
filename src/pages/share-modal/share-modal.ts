import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';


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

  constructor(private platform: Platform, public navCtrl: NavController,
              public navParams: NavParams) {
    this.platform = platform;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareModalPage');
  }

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

}
