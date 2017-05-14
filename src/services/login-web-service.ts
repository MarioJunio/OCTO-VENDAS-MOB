import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Globals } from '../global/globals';
import { WebService } from './web-service';
import { VendedorDAO } from '../dao/vendedor-dao';
import { Url } from '../global/ws-url';
import { ParametroSistemaDao } from '../dao/parametro-sistema-dao';
import { AppParametros } from '../configuracoes/parametros-app';

@Injectable()
export class LoginWebService extends WebService {

    constructor(public platform: Platform, public http: Http, public globals: Globals, public vendedorDAO: VendedorDAO, public parametroDao: ParametroSistemaDao) {
        super(platform, http, globals, vendedorDAO);
    }

    public doLogin(usuario, senha, successCallback, errorCallback) {

        let myHeaders = new Headers();
        super.addBasicAuth(myHeaders, usuario, senha);

        this.parametroDao.buscarParametro(AppParametros.parametros.web_service.id, data => {

            let url = Url.fix(data.rows.item(0).valor);

            this.http.get(url + Url.LOGIN_WS, {
                headers: myHeaders
            }).subscribe(data => {
                successCallback(JSON.parse(data.text()));
            }, error => {
                errorCallback(error);
            });

        }, error => {
            alert('Não foi possível buscar o parâmetro: ' + AppParametros.parametros.web_service.id);
        });

    }

}
