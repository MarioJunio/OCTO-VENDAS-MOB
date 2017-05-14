import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-finalizar-venda',
  templateUrl: 'finalizar-venda.html'
})

export class FinalizarVendaPage {

  selectNumeroParcelas = {
    title: 'Parcelas disponíveis'
  };

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
  }

  voltar() {
    this.viewCtrl.dismiss()
  }

}
