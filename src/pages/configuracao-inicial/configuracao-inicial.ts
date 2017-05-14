import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ConfiguracaoInicial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-configuracao-inicial',
  templateUrl: 'configuracao-inicial.html'
})
export class ConfiguracaoInicialPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ConfiguracaoInicialPage Page');
  }

}
