import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AppParametros } from '../configuracoes/parametros-app';
import { DAO } from './dao';

@Injectable()
export class ParametroSistemaDao extends DAO {

    private sqlite: SQLite;
    public tabela: string;
    public colunas: any;

    constructor(public platform: Platform) {
        super();

        this.tabela = 'parametro_sistema';
        this.colunas = {
            id: 'id',
            descricao: 'descricao',
            valor: 'valor',
            categoria: 'categoria',
            tipo: 'tipo',
            ativo: 'ativo'
        };

        this.platform.ready().then(() => {

            this.sqlite = new SQLite();
            this.sqlite.openDatabase({
                name: this.database,
                location: this.location
            }).then(() => {
                this.criarTabela();
                this.inicializaParametros();
            }, (e) => {
                alert(JSON.stringify(e));
            });
        });
    }

    public criarTabela() {

        // cria tabela
        let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
        sql += this.colunas.id + ' integer primary key, ';
        sql += this.colunas.descricao + ' varchar(300), ';
        sql += this.colunas.valor + ' varchar(300), ';
        sql += this.colunas.categoria + ' integer, ';
        sql += this.colunas.tipo + ' integer, ';
        sql += this.colunas.ativo + ' boolean(1)';
        sql += ')';

        this.sqlite.executeSql(sql, []).then(null, error => {
            alert('Não foi possivel criar a tabela de parametros do sistema: ' + JSON.stringify(error));
        });

    }

    private inicializaParametros() {

        // itera sobre todos os parâmetros
        Object.keys(AppParametros.parametros).forEach(key => {

            let parametro = AppParametros.parametros[key];

            this.buscar(parametro.id).then(data => {

                if (data.rows.length <= 0) {
                    this.criarParametro(parametro);
                }

            }).catch(error => {
                alert('Não foi possível buscar o parâmetro de código: ' + parametro.id);
            });

        });

    }

    public criarParametro(param) {
        let sql = 'INSERT INTO ' + this.tabela + '(' + super.colunasToSQL(this.colunas) + ') VALUES (' + super.colunasParametrosToSQL(this.colunas) + ')';
        return this.sqlite.executeSql(sql, [param.id, param.descricao, param.valor, param.categoria, param.tipo, param.ativo]);
    }

    public buscar(id: Number) {
        return this.sqlite.executeSql('select * from ' + this.tabela + ' where ' + this.colunas.id + ' = ?', [id]);
    }

    public buscarParametro(id, callbackSuccess, callbackError) {
        let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

        this.sqlite.executeSql(sql, [id]).then((data) => {
            callbackSuccess(data);
        }, (error) => {
            callbackError(error);
        });

    }

    public atualizar(id, valor) {
        let sql = 'UPDATE ' + this.tabela + ' SET ' + this.colunas.valor + ' = ? WHERE ' + this.colunas.id + ' = ?';
        return this.sqlite.executeSql(sql, [valor, id]);
    }

    /**
     * Busca todos os parametros
     */
    public todos() {
        return this.sqlite.executeSql('select * from ' + this.tabela, []);
    }

    public buscarParametrosPorCategoria(categoriaId, callbackSuccess, callbackError) {

        let parametros = [];

        this.platform.ready().then(() => {

            let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.categoria + ' = ?';

            this.sqlite.executeSql(sql, [categoriaId]).then((data) => {

                if (data.rows.length > 0) {

                    for (var i = 0; i < data.rows.length; i++) {
                        parametros.push(data.rows.item(i));
                    }
                }

                callbackSuccess(parametros);
            }, (error) => {
                callbackError(error);
            });
        });

    }

}
