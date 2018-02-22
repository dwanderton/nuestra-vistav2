import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { CreateModalPage } from '../pages/create-modal/create-modal';
import { PhotoModalPage } from '../pages/photo-modal/photo-modal';
import { StreetViewModalPage } from '../pages/street-view-modal/street-view-modal';
import { ShareModalPage } from '../pages/share-modal/share-modal';
import { LoginPage } from '../pages/login/login';
import { CameraLibraryPopoverPage } from "../pages/camera-library-popover/camera-library-popover";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Pro } from '@ionic/pro';

import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from "angularfire2/database";

import { Camera } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Network } from '@ionic-native/network';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

const IonicPro = Pro.init('0716b822', {
  appVersion: "0.01"
});

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateModalPage,
    PhotoModalPage,
    StreetViewModalPage,
    ShareModalPage,
    CameraLibraryPopoverPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CreateModalPage,
    PhotoModalPage,
    StreetViewModalPage,
    ShareModalPage,
    CameraLibraryPopoverPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    Camera,
    File,
    PhotoLibrary,
    FileTransfer,
    FileTransferObject,
    Network,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}
