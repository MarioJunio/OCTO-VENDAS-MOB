import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MinhasVendasPage } from '../minhas-vendas/minhas-vendas';
import { ClientesPage } from '../clientes/clientes';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})

export class InicioPage {

  tabMinhasVendas = MinhasVendasPage;
  tabMeusClientes = ClientesPage;
  tabProdutos = null;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Inicio carregado');
  }

}
