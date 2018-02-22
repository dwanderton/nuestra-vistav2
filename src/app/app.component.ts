import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
// import { LoginPage } from '../pages/login/login';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { StreetViewModalPage } from '../pages/street-view-modal/street-view-modal';
import { HomePage } from '../pages/home/home';
import {ShareModalPage} from "../pages/share-modal/share-modal";
import {PhotoModalPage} from "../pages/photo-modal/photo-modal";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
