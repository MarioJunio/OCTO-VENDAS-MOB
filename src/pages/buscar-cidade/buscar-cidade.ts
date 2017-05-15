import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-buscar-cidade',
  templateUrl: 'buscar-cidade.html'
})

export class BuscarCidadePage {

  public nomeCidade: String;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello BuscarCidadePage Page');
  }

  public fechar() {
    
  }

}
