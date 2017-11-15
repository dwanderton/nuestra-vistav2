import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateModalPage } from './create-modal';

@NgModule({
  declarations: [
    CreateModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateModalPage),
  ],
})
export class CreateModalPageModule {}
