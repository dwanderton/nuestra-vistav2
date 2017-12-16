import { Component } from '@angular/core';
import { NavController, ModalController} from 'ionic-angular';
import { CreateModalPage } from '../create-modal/create-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  public buttonClicked: boolean = false; //Whatever you want to initialise it as

  public onButtonClick() {

      this.buttonClicked = !this.buttonClicked;
  }
  
  openCreateModal() {
    let myModal = this.modalCtrl.create(CreateModalPage);
    myModal.present();
  }
}
