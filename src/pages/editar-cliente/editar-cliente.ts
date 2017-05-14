import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the EditarCliente page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-editar-cliente',
  templateUrl: 'editar-cliente.html'
})
export class EditarClientePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello EditarClientePage Page');
  }

}
