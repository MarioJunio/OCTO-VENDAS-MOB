import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-buscar-cliente',
  templateUrl: 'buscar-cliente.html'
})

export class BuscarClientePage {

  buscaCliente: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    this.buscaCliente = '';
  }

  ionViewDidLoad() {
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

}
