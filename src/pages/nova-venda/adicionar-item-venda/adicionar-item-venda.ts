import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { BuscarProdutoPage } from '../../buscar-produto/buscar-produto';


@Component({
  selector: 'page-adicionar-item-venda',
  templateUrl: 'adicionar-item-venda.html'
})

export class AdicionarItemVendaPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  ionViewDidLoad() {
  }

  selecionarProduto() {
    let buscarProdutoModal = this.modalCtrl.create(BuscarProdutoPage);
    buscarProdutoModal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
