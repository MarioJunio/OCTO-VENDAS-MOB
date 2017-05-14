import { Injectable } from '@angular/core';

@Injectable()
export class Util {

    public constructor() {
    }

    public static formataData(millisegundos) {

        let data = new Date(millisegundos);
        let dia;
        let mes;
        let ano;

        if (data.getDate().toString().length <= 1) 
            dia = '0' + data.getDate().toString();

        if (data.getMonth().toString().length <= 1)
            mes = '0' + (data.getMonth() + 1).toString();
        
        ano = data.getFullYear().toString();

        return dia + '/' + mes + '/' + ano;
    }

    public static getMillisegundos(data) {
        
        let diaMesAno = data.split('/');

        if (diaMesAno.length > 0) {

            let dia = diaMesAno[0];
            let mes = diaMesAno[1];
            let ano = diaMesAno[2];

            return new Date(ano, mes, dia);
        }

        return null;
    }

    public static criarCredencial(usuario: string, senha: string ) {
        
        let plainCredentials = usuario + ':' + senha;
        let base64Credentials = btoa(plainCredentials);

        return base64Credentials;
    }
}