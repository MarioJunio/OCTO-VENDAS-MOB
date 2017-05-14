import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { DAO } from './dao';

@Injectable()
export class MarcaDAO extends DAO {

  private sqlite: SQLite;
  public tabela: string;
  public colunas: any;

  constructor(public platform: Platform) {
    super();

    this.tabela = 'marca';
    this.colunas = {
      id: 'id',
      nome: 'nome'
    };

    // cria tabela
    this.platform.ready().then(() => {

      this.sqlite = new SQLite();
      this.sqlite.openDatabase({
        name: this.database,
        location: this.location
      }).then(() => {
        this.criarTabela();
      }, (e) => {
        alert(JSON.stringify(e));
      });

    });

  }

  public criarTabela() {

    // cria tabela
    let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
    sql += this.colunas.id + ' integer primary key, ';
    sql += this.colunas.nome + ' varchar(80)';
    sql += ')';

    this.sqlite.executeSql(sql, []).then(() => {
    }, (error) => {
      alert('Não foi possivel criar a tabela: ' + this.tabela + ' - ' + JSON.stringify(error));
    });

  }

  public buscar(id, callbackSuccess) {

    this.platform.ready().then(() => {

      let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

      this.sqlite.executeSql(sql, [id]).then((data) => {

        let marca = null;

        if (data.rows.length > 0)
          marca = data.rows.item(0);

        callbackSuccess(marca);

      }).catch((error) => {
        alert('Houve um problema ao buscar a marca: ' + JSON.stringify(error));
      });

    });

  }

  public salvar(marca, callbackSuccess, callbackError) {

    this.platform.ready().then(() => {

      let colunasSql = this.colunasToSQL(this.colunas);

      let sql = 'INSERT INTO ' + this.tabela + ' (' + colunasSql + ')' + ' VALUES ' + '(' + this.colunasParametrosToSQL(this.colunas) + ')';

      this.sqlite.executeSql(sql, [marca.id, marca.nome]).then((data) => {
        callbackSuccess(data.insertId);
      }).catch((reason) => {
        callbackError(reason);
      });

    });

  }

}