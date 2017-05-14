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
export class ClienteWS extends WebService {

  constructor(public platform: Platform, public http: Http, public globals: Globals, public vendedorDAO: VendedorDAO, public parametroDAO: ParametroSistemaDao) {
    super(platform, http, globals, vendedorDAO);
  }

  public getStatusSincClientes(callback, callbackE) {

    this.parametroDAO.buscar(AppParametros.parametros.web_service.id).then(data => {

      // endereço do WS
      let url = Url.fix(data.rows.item(0).valor);

      this.parametroDAO.buscar(AppParametros.parametros.sincronizacao_cliente.id).then(data => {

        // parâmetro código do vendedor
        let paramVendedorId = this.globals.getVendedor().id;

        // parâmetro data última sincronização dos clientes
        let paramDataUltimaSincronizacaoClientes = data.rows.item(0).valor;

        // parâmetro a serem
        let params = paramVendedorId + '/' + paramDataUltimaSincronizacaoClientes + '/';

        this.http.get(url + Url.CONSULTA_STATUS_SINC_CLIENTES_WS + params, {
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

  public sincronizarClientes(callback, callbackError) {

    this.parametroDAO.buscar(AppParametros.parametros.web_service.id).then(data => {

      let url = Url.fix(data.rows.item(0).valor);

      this.parametroDAO.buscar(AppParametros.parametros.sincronizacao_cliente.id).then(data => {

        let vendedorId = this.globals.getVendedor().id;
        let paramDataUltimaSincronizacaoClientes = data.rows.item(0).valor;

        let params = vendedorId + '/' + paramDataUltimaSincronizacaoClientes + '/';

        this.http.get(url + Url.SINC_CLIENTES_WS + params, {
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
