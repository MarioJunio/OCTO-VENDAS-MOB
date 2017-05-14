import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ProdutoDAO } from '../../dao/produto-dao';

@Component({
  selector: 'page-buscar-produto',
  templateUrl: 'buscar-produto.html'
})

export class BuscarProdutoPage {

  buscaProduto: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public produtoDAO: ProdutoDAO) {
    this.buscaProduto = '';
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

}
