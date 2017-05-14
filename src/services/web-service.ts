import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Globals } from '../global/globals';
import { VendedorDAO } from '../dao/vendedor-dao';
import { Util } from '../lib/util';
import { Vendedor } from '../model/vendedor';

export abstract class WebService {

    constructor(public platform: Platform, public http: Http, public globals: Globals, public vendedorDAO: VendedorDAO) { }

    /**
     * Adiciona as credenciais ao cabecalho da requisicao
     */
    private addBasicAuthManual(headers: Headers, username: string, password: string) {
        headers.append('Authorization', 'Basic ' + Util.criarCredencial(username, password));
    }

    /**
     * Adiciona as credenciais no cabeçalho da requisicão
     * As credenciais serão buscadas no cache local, se não forem encontradas serão buscadas no banco de dados
     * Caso as credenciais não sejam encontradas será lançada uma exceção
     */
    private addBasicAuthAuto(headers: Headers) {

        // busca o vendedor ativo no cache
        let vendedor = this.globals.getVendedor();

        // se o vendedor não está no cache, então busque o vendedor ativo no banco de dados
        if (vendedor == null) {

          this.vendedorDAO.buscarVendedorAtivo().then(data => {

            // verifica se encontrou algum vendedor ativo
            if (data.rows.length > 0) {

              // vendedor ativo
              let vendedor = data.rows.item(0);

              headers.append('Authorization', 'Basic ' + vendedor.credenciais);

            }

          }).catch(reason => {
            alert('Não foi possível buscar o vendedor ativo!');
          });

        } else {
            headers.append('Authorization', 'Basic ' + vendedor.credenciais);
        }

    }

    public addBasicAuth(headers: Headers, username, password: string) {

        headers.append('Cache-Control', 'no-cache');

        // autenticacao manual
        if (username == null || password == null) {
            this.addBasicAuthAuto(headers);
        } else {
            // autenticacao automatica
            this.addBasicAuthManual(headers, username, password);
        }
    }

    public getBasicAuthHeader() {

      let headers: Headers = new Headers();

      headers.append('Cache-Control', 'no-cache');

      // vendedor ativo no momento
      let vendedor: Vendedor = this.globals.getVendedor();

      // checa se o vendedor foi encontrado, adicione suas credenciais ao header
      if (vendedor != null) {
          headers.append('Authorization', 'Basic ' + vendedor.credenciais);
      } else {
          throw new TypeError("Nenhum vendedor está ativo");
      }

      return headers;
    }

}
