import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { WebService } from '../services/web-service';
import { Platform } from 'ionic-angular';
import { Globals } from '../global/globals';
import { VendedorDAO } from '../dao/vendedor-dao';
import { Url } from '../global/ws-url';
import { AppParametros } from '../configuracoes/parametros-app';
import { ParametroSistemaDao } from '../dao/parametro-sistema-dao';
import 'rxjs/add/operator/map';

@Injectable()
export class FormasPagamentoWS extends WebService {

  constructor(public platform: Platform, public http: Http, public globals: Globals, public vendedorDAO: VendedorDAO, public parametroDAO: ParametroSistemaDao) {
    super(platform, http, globals, vendedorDAO);
  }

  public getStatus(callback, callbackE) {

    this.parametroDAO.buscar(AppParametros.parametros.web_service.id).then(data => {

      // endereço do WS
      let url = Url.fix(data.rows.item(0).valor);

      this.parametroDAO.buscar(AppParametros.parametros.sincronizaca_formas_pagamento.id).then(data => {

        // obtem código do vendedor ativo na sessao
        let paramVendedorId = this.globals.getVendedor().id;

        // parâmetro data última sincronização das formas de pagamento
        let paramDataUltimaSincronizacaoFormasPagamento = data.rows.item(0).valor;

        // parâmetro a serem
        let params = paramDataUltimaSincronizacaoFormasPagamento + '/';

        this.http.get(url + Url.CONSULTA_STATUS_SINC_FORMAS_PAGAMENTO_WS + params, {
          headers: super.getBasicAuthHeader()
        }).subscribe(data => {
          callback(data.text());
        }, error => {
          callbackE(error);
        });

      }).catch(error => {
        alert('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.sincronizacao_cliente.id);
      });

    }).catch(error => {
      alert('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.web_service.id);
    });

  }

  public sincronizar(callback, callbackError) {

    this.parametroDAO.buscar(AppParametros.parametros.web_service.id).then(data => {

      let url = Url.fix(data.rows.item(0).valor);

      this.parametroDAO.buscar(AppParametros.parametros.sincronizaca_formas_pagamento.id).then(data => {

        let vendedorId = this.globals.getVendedor().id;
        let paramDataSincronizacao = data.rows.item(0).valor;

        let params = paramDataSincronizacao + '/';

        this.http.get(url + Url.SINC_FORMAS_PAGAMENTO_WS + params, {
          headers: super.getBasicAuthHeader()
        }).subscribe(data => {
          callback(data.text());
        }, error => {
          callbackError(error);
        });

      }).catch(error => {
        callbackError('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.sincronizacao_cliente.id)
      });

    }).catch(error => {
      callbackError('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.web_service.id)
    });

  }

}
