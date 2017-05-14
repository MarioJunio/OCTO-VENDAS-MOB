import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { NovaVendaPage } from '../nova-venda/nova-venda';

@Component({
  selector: 'page-minhas-vendas',
  templateUrl: 'minhas-vendas.html'
})

export class MinhasVendasPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {}

  abrirModalNovaVenda() {

    let novaVendaModal = this.modalCtrl.create(NovaVendaPage);
    novaVendaModal.present();
  }

}
