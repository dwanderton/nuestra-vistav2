import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoModalPage } from './photo-modal';

@NgModule({
  declarations: [
    PhotoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoModalPage),
  ],
})
export class PhotoModalPageModule {}
