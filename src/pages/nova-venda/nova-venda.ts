import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { AdicionarItemVendaPage } from './adicionar-item-venda/adicionar-item-venda';
import { BuscarClientePage } from '../buscar-cliente/buscar-cliente';
import { FinalizarVendaPage } from './finalizar-venda/finalizar-venda';

@Component({
  selector: 'page-nova-venda',
  templateUrl: 'nova-venda.html'
})

export class NovaVendaPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  selectFormaPagamento = {
    title: 'Formas de pagamento'
  };

  ionViewDidLoad() {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  abrirIncluirItem() {

    let incluirItemVendaModal = this.modalCtrl.create(AdicionarItemVendaPage);
    incluirItemVendaModal.present();
  }

  buscarCliente() {
    let buscarClienteModal = this.modalCtrl.create(BuscarClientePage);
    buscarClienteModal.present();
  }

  finalizar() {
    let finalizarVendaModal = this.modalCtrl.create(FinalizarVendaPage);
    finalizarVendaModal.present({});
  }

}
