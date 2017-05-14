import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProdutosWebService } from '../../services/produtos-web-service';
import { ClienteWS } from '../../providers/cliente-ws';
import { FormasPagamentoWS } from '../../providers/formas-pagamento-ws';
import { ClienteService } from '../../services/cliente-service';
import { ParametroSistemaDao } from '../../dao/parametro-sistema-dao';
import { Platform } from 'ionic-angular';
import { AppParametros } from '../../configuracoes/parametros-app';
import { FormaPagamentoService } from '../../services/forma-pagamento-service';

@Component({
  selector: 'page-sincronizar-dados',
  templateUrl: 'sincronizar-dados.html'
})

export class SincronizarDadosPage {

  // botoes dados nao enviados
  public btnMinhasVendas;
  public btnMeusClientes;

  // botoes dados sincronizacao
  public btnProdutos;
  public btnClientes;
  public btnFormasPagamento;

  constructor(public navCtrl: NavController, public produtosWebService: ProdutosWebService, public clienteWS: ClienteWS, public formasPagamentoWS: FormasPagamentoWS, public clienteService: ClienteService, public platform: Platform, public parametroDAO: ParametroSistemaDao, public formaPagamentoService: FormaPagamentoService) {
  }

  ngOnInit() {

    this.btnMinhasVendas = true;
    this.btnMeusClientes = true;
    this.btnProdutos = true;
    this.btnClientes = true;
    this.btnFormasPagamento = true;

    // Aguarda 1 segundos para a aplicação ser carregada
    setTimeout(() => {

      this.platform.ready().then(() => {
        this.checaSincronizacaoProdutos();
        this.checarSincronizacaoClientes();
        this.checarSincronizacaoFormasPagamento();
      });

    }, 1000);

  }

  public checaSincronizacaoProdutos() {

    this.produtosWebService.checaSincronizacaoProdutos(data => {

      // se = 'S', então há dados para serem sincronizados
      if (data.text() == 'S') {
        this.btnProdutos = false;
      }

    }, (error) => {
      alert('Não foi possível obter o status de sincronização dos produtos');
    });

  }

  public checarSincronizacaoClientes() {

    this.clienteWS.getStatusSincClientes(status => {

      if (status == 'S') {
        this.btnClientes = false;
      }

    }, error => {
      alert('Não foi possível obter o status de sincronização dos clientes');
    });

  }

  public checarSincronizacaoFormasPagamento() {

    this.formasPagamentoWS.getStatus(status => {
      this.btnFormasPagamento = (status === 'S') ? false : true;
    }, error => {
      alert('Não foi possível obter o status de sincronização das formas de pagamento');
    });

  }

  public sincronizaProdutos() {

    // desabilita botao para sincronizar os produtos
    this.btnProdutos = true;

    this.produtosWebService.sincronizaProdutos(null, error => {
      alert('Não foi possível sincronizar os produtos no momento: ' + JSON.stringify(error));
      this.btnProdutos = false;
    });
  }

  public sincronizarClientes() {

    this.btnClientes = true;

    this.clienteWS.sincronizarClientes(clientes => {

      let json = JSON.parse(clientes);

      for (let cliente of json.clientes) {
        this.clienteService.salvar(cliente);
      }

      // atualiza parâmetro 'data da última sincronziação dos clientes'
      this.parametroDAO.atualizar(AppParametros.parametros.sincronizacao_cliente.id, json.dataSincronizacao);

    }, error => {
      alert('Não foi possível sincronizar os clientes no momento: ' + JSON.stringify(error));
      this.btnClientes = false;
    });
  }

  public sincronizarFormasPagamento() {

    this.btnFormasPagamento = true;

    this.formasPagamentoWS.sincronizar(formasPagamento => {

      let json = JSON.parse(formasPagamento);

      for (let formaPagamento of json.formasPagamento) {
        this.formaPagamentoService.salvar(formaPagamento);
      }

      // atualiza o parâmetro data de sincronização
      this.parametroDAO.atualizar(AppParametros.parametros.sincronizaca_formas_pagamento.id, json.dataSincronizacao);

    }, error => {
      alert('Não foi possível sincronizar as formas de pagamento no momento: ' + JSON.stringify(error));
      this.btnFormasPagamento = false;
    });

  }

}
