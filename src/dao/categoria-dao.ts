import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { DAO } from './dao';

@Injectable()
export class CategoriaDAO extends DAO {

  private sqlite: SQLite;
  private options;

  public tabela: string;
  public colunas: any = {};

  constructor(public platform: Platform) {
    super();

    this.tabela = 'categoria';
    this.colunas = {
      id: 'id',
      nome: 'nome'
    };

    this.platform.ready().then(() => {

      this.sqlite = new SQLite();
      this.sqlite.openDatabase({
        name: this.database,
        location: this.location
      }).then(() => {
        this.criaTabela();
      }).catch(reason => {
        alert('Não foi possível abrir o banco de dados: ' + JSON.stringify(reason));
      });

    });

  }

  /**
   * Cria tabela
   */
  public criaTabela() {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
    sql += this.colunas.id + ' integer primary key, ';
    sql += this.colunas.nome + ' varchar(80)';
    sql += ')';

    this.sqlite.executeSql(sql, []).then(() => {
      // Tabela criada
    }).catch(reason => {
      alert('Erro ao criar tabela: ' + JSON.stringify(reason));
    });

  }

  public buscar(categoriaId, callbackSuccess) {

    let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

    this.sqlite.executeSql(sql, [categoriaId]).then(data => {

      let categoria = null;

      if (data.rows.length > 0) {
        categoria = data.rows.item(0);
      }

      // chama callback de sucesso passando a categoria encontrada
      callbackSuccess(categoria);

    }).catch(reason => {
      alert('Não foi possível buscar a categoria de código: ' + categoriaId);
    });
  }

  public salvar(categoria, callbackSuccess, callbackError) {

    let sql = 'INSERT INTO ' + this.tabela + ' (' + this.colunasToSQL(this.colunas) + ')' + ' VALUES ' + '(' + this.colunasParametrosToSQL(this.colunas) + ')';

    // alert('[sql] salvar: ' + sql);

    this.sqlite.executeSql(sql, [categoria.id, categoria.nome]).then(data => {
      callbackSuccess(data.insertId);
    }).catch(reason => {
      callbackError(reason);
    });
  }
}