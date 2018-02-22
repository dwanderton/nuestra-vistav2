import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraLibraryPopoverPage } from './camera-library-popover';

@NgModule({
  declarations: [
    CameraLibraryPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraLibraryPopoverPage),
  ],
})
export class CameraLibraryPopoverPageModule {}
