import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StreetViewModalPage } from './street-view-modal';

@NgModule({
  declarations: [
    StreetViewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(StreetViewModalPage),
  ],
})
export class StreetViewModalPageModule {}
