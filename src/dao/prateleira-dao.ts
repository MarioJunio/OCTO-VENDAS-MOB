import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { DAO } from './dao';

@Injectable()
export class PrateleiraDAO extends DAO {

  private sqlite: SQLite;
  public tabela: string;
  public colunas: any;

  public constructor(public platform: Platform) {
    super();
    
    this.tabela = 'prateleira'
    this.colunas = {
      id: 'id',
      descricao: 'descricao'
    };

    this.platform.ready().then(() => {

      this.sqlite = new SQLite();

      this.sqlite.openDatabase({
        name: this.database,
        location: this.location
      }).then(() => {
        this.criarTabela();
      }).catch(reason => {
        alert('Não foi possível criar o banco de dados: ' + JSON.stringify(reason));
      });

    });

  }

  private criarTabela() {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
    sql += this.colunas.id + ' integer primary key, ';
    sql += this.colunas.descricao + ' varchar(80)';
    sql += ')';

    this.sqlite.executeSql(sql, []).then(() => {
      // tabela criada
    }).catch((reason) => {
      alert('Erro ao criar tabela: ' + this.tabela);
    });
  }

  /**
   * Busca a prateleira por id
   */
  public buscar(prateleiraId, callbackSuccess) {

    this.platform.ready().then(() => {

      let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

      this.sqlite.executeSql(sql, [prateleiraId]).then((data) => {

        let prateleira = null;

        if (data.rows.length > 0) {
          prateleira = data.rows.item(0);
        }

        callbackSuccess(prateleira);

      }).catch((reason) => {
        alert('Houve um problema ao buscar a prateleira: ' + JSON.stringify(reason));
      });

    });
  }

  public salvar(prateleira, callbackSuccess, callbackError) {

    let sql = 'INSERT INTO ' + this.tabela + ' (' + this.colunasToSQL(this.colunas) + ')' + ' VALUES (' + this.colunasParametrosToSQL(this.colunas) + ')';

    this.sqlite.executeSql(sql, [prateleira.id, prateleira.descricao]).then((data) => {
      callbackSuccess(data.insertId);
    }).catch((reason) => {
      callbackError(reason);
    });

  }

}