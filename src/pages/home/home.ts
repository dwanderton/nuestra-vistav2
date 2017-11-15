import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { CreateModalPage } from '../create-modal/create-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  openCreateModal() {
    let myModal = this.modalCtrl.create(CreateModalPage);
    myModal.present();
  }
}
