import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { BuscarCidadePage } from '../buscar-cidade/buscar-cidade';

@Component({
  selector: 'page-detalhes-cliente',
  templateUrl: 'detalhes-cliente.html'
})

export class DetalhesClientePage {

  public cliente: any;
  public grpCliente: any;

  constructor(public navCtrl: NavController, public params: NavParams, public formBuilder: FormBuilder) {
    this.cliente = this.params.get("clienteSelecionado");

    this.grpCliente = formBuilder.group({
      nome: [this.cliente.nome],
      nomeFantasia: [this.cliente.nomeFantasia],
      cnpj: [this.cliente.cnpj],
      inscricaoEstadual: [this.cliente.inscricaoEstadual],
      razaoSocial: [this.cliente.razaoSocial],
      cpf: [this.cliente.cpf],
      rg: [this.cliente.rg],
      email: [this.cliente.email],
      uf: [this.cliente.cidade.estado.uf],
      fone1: [this.cliente.fone1],
      fone2: [this.cliente.fone2],
      cep: [this.cliente.cep],
      bairro: [this.cliente.bairro],
      logradouro: [this.cliente.logradouro],
      numero: [this.cliente.numero],
      complemento: [this.cliente.complemento]
    });

  }

  ionViewDidLoad() {
    console.log('Cliente selecionado: ' + JSON.stringify(this.cliente));
  }

  public buscarCidade() {
    this.navCtrl.push(BuscarCidadePage, { uf: 'MG' });
    console.log('buscar cidade...');
  }

}
