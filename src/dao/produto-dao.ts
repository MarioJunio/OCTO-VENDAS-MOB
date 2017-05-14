import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { MarcaDAO } from './marca-dao';
import { Marca } from '../model/marca';
import { CategoriaDAO } from './categoria-dao';
import { Categoria } from '../model/categoria';
import { PrateleiraDAO } from './prateleira-dao';
import { Prateleira } from '../model/prateleira';
import { DAO } from './dao';

@Injectable()
export class ProdutoDAO extends DAO {

  private sqlite: SQLite;
  public tabela: string;
  public colunas: any;

  constructor(public platform: Platform, public marcaDao: MarcaDAO, public categoriaDao: CategoriaDAO, public prateleiraDao: PrateleiraDAO) {
    super();

    this.tabela = 'produto';

    this.colunas = {
      id: 'id',
      nome: 'nome',
      marca: 'marca_id',
      categoria: 'categoria_id',
      ncm: 'ncm',
      dataCadastro: 'data_cadastro',
      descricao: 'descricao',
      prateleira: 'prateleira_id',
      quantidade: 'quantidade',
      estoque: 'estoque',
      valor: 'valor',
      ean: 'ean',
      finalidade: 'finalidade',
      complemento: 'complemento',
      ignorarQuantidade: 'ignorar_quantidade',
      dataAlteracao: 'data_alteracao'
    };

    this.platform.ready().then(() => {

      this.sqlite = new SQLite();
      this.sqlite.openDatabase({
        name: this.database,
        location: this.location
      }).then(() => {
        this.criarTabela();
      }).catch(reason => {
        alert('Não foi possível se conectar ao banco de dados localmente.');
      });

    });

  }

  private criarTabela() {

    let sql = 'CREATE TABLE IF NOT EXISTS ' + this.tabela + '(';
    sql += this.colunas.id + ' integer primary key, ';
    sql += this.colunas.nome + ' varchar(80), ';
    sql += this.colunas.marca + ' integer, ';
    sql += this.colunas.categoria + ' integer, ';
    sql += this.colunas.ncm + ' varchar(20), ';
    sql += this.colunas.dataCadastro + ' date, ';
    sql += this.colunas.descricao + ' varchar(5000), ';
    sql += this.colunas.prateleira + ' integer, ';
    sql += this.colunas.quantidade + ' decimal(10,2), ';
    sql += this.colunas.estoque + ' integer, ';
    sql += this.colunas.valor + ' decimal(10,2), ';
    sql += this.colunas.ean + ' varchar(13), ';
    sql += this.colunas.finalidade + ' varchar(20), ';
    sql += this.colunas.complemento + ' varchar(5000), ';
    sql += this.colunas.ignorarQuantidade + ' boolean, ';
    sql += this.colunas.dataAlteracao + ' date';
    sql += ')';

    this.sqlite.executeSql(sql, []).then(() => {
      // tabela criada com sucesso
    }).catch(reason => {
      alert('A tabela ' + this.tabela + ' não foi criada!');
    });
  }

  /*
  * Salva produto
  */
  public salvar(produto, callbackSuc, callbackError) {

    if (this.sqlite) {

      let sql = 'INSERT INTO ' + this.tabela + ' (';
      sql += this.colunas.id + ',';
      sql += this.colunas.nome + ',';
      sql += this.colunas.marca + ',';
      sql += this.colunas.categoria + ',';
      sql += this.colunas.ncm + ',';
      sql += this.colunas.dataCadastro + ',';
      sql += this.colunas.descricao + ',';
      sql += this.colunas.prateleira + ',';
      sql += this.colunas.quantidade + ',';
      sql += this.colunas.estoque + ',';
      sql += this.colunas.valor + ',';
      sql += this.colunas.ean + ',';
      sql += this.colunas.finalidade + ',';
      sql += this.colunas.complemento + ',';
      sql += this.colunas.ignorarQuantidade + ',';
      sql += this.colunas.dataAlteracao + ') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

      this.sqlite.executeSql(sql, [produto.id, produto.nome, produto.marca.id, produto.categoria.id, produto.ncm,
      produto.dataCadastro, produto.descricao, produto.prateleira.id, produto.quantidade, produto.estoque,
      produto.valor, produto.ean, produto.finalidade, produto.complemento, produto.ignorarQuantidade, produto.dataAlteracao]).then((data) => {
        callbackSuc(data);
      }, (error) => {
        callbackError(error);
      });
    }
  }

  public editar(produto, callbackSuccess, callbackError) {

    if (this.sqlite) {

      let sql = 'UPDATE ' + this.tabela + ' SET ';
      sql += this.colunas.nome + ' = ?, ';
      sql += this.colunas.marca + ' = ?, ';
      sql += this.colunas.categoria + ' = ?, ';
      sql += this.colunas.ncm + ' = ?, ';
      sql += this.colunas.dataCadastro + ' = ?, ';
      sql += this.colunas.descricao + ' = ?, ';
      sql += this.colunas.prateleira + ' = ?, ';
      sql += this.colunas.quantidade + ' = ?, ';
      sql += this.colunas.estoque + ' = ?, ';
      sql += this.colunas.valor + ' = ?, ';
      sql += this.colunas.ean + ' = ?, ';
      sql += this.colunas.finalidade + ' = ?, ';
      sql += this.colunas.complemento + ' = ?, ';
      sql += this.colunas.ignorarQuantidade + ' = ?, ';
      sql += this.colunas.dataAlteracao + ' = ? ';
      sql += 'WHERE ' + this.colunas.id + ' = ?';

      // se o sql foi montado com sucesso
      if (sql) {

        this.sqlite.executeSql(sql, [produto.nome, produto.marca.id, produto.categoria.id, produto.ncm, produto.dataCadastro, produto.descricao,
        produto.prateleira.id, produto.quantidade, produto.estoque, produto.valor, produto.ean, produto.finalidade, produto.complemento,
        produto.ignorarQuantidade, produto.dataAlteracao, produto.id]).then(data => {
          callbackSuccess(data);
        }).catch(reason => {
          callbackError(reason);
        });

      }

    }

  }

  public buscarTodos(callbackSuccess, callbackError) {

    if (this.sqlite) {

      let sql = 'SELECT A.*, B.' + this.marcaDao.colunas.nome + ' AS marca_nome, C.' + this.categoriaDao.colunas.nome + ' AS categoria_nome, D.' + this.prateleiraDao.colunas.descricao + ' AS prateleira_descricao FROM ' + this.tabela + ' A ';
      sql += 'LEFT JOIN ' + this.marcaDao.tabela + ' B ON (B.' + this.marcaDao.colunas.id + '  = A.' + this.colunas.marca + ') ';
      sql += 'LEFT JOIN ' + this.categoriaDao.tabela + ' C ON (C.' + this.categoriaDao.colunas.id + ' = A.' + this.colunas.categoria + ') '
      sql += 'LEFT JOIN ' + this.prateleiraDao.tabela + ' D ON (D.' + this.prateleiraDao.colunas.id + ' = A.' + this.colunas.prateleira + ') ';
      sql += 'ORDER BY A.' + this.colunas.nome;

      this.sqlite.executeSql(sql, []).then((data) => {

        let produtos = [];

        for (let i = 0; i < data.rows.length; i++) {

          let item = data.rows.item(i);

          let marca = new Marca(item[this.colunas.marca], item['marca_nome']);
          let categoria = new Categoria(item[this.colunas.categoria], item['categoria_nome']);
          let prateleira = new Prateleira(item[this.colunas.prateleira], item['prateleira_descricao']);

          let produto = new Produto(item[this.colunas.id], item[this.colunas.nome], marca, categoria, item[this.colunas.ncm], item[this.colunas.dataCadastro], item[this.colunas.descricao], prateleira, item[this.colunas.ncm], item[this.colunas.quantidade], item[this.colunas.estoque], item[this.colunas.valor], item[this.colunas.ean], item[this.colunas.finalidade], item[this.colunas.complemento], item[this.colunas.ignorarQuantidade], item[this.colunas.dataAlteracao]);

          produtos.push(produto);
        }

        callbackSuccess(produtos);

      }, (error) => {
        callbackError(error);
      })
    }

  }

  public buscarTodosParaSincronizacao(callbackSuccess, callbackError) {

    if (this.sqlite) {

      let sql = 'SELECT * FROM ' + this.tabela;

      this.sqlite.executeSql(sql, []).then((data) => {

        let produtos = [];

        for (let i = 0; i < data.rows.length; i++) {

          let item = data.rows.item(i);

          // cria objeto json do produto a ser verificado a sincronizacao
          let produto = {
            id: item[this.colunas.id],
            dataAlteracao: item[this.colunas.dataAlteracao]
          };

          produtos.push(produto);
        }

        callbackSuccess(produtos);

      }, (error) => {
        callbackError(error);
      });
    }
  }

  public buscar(produtoId, callbackSuccess, callbackError) {

    if (this.sqlite) {

      let sql = 'SELECT * FROM ' + this.tabela + ' WHERE ' + this.colunas.id + ' = ?';

      this.sqlite.executeSql(sql, [produtoId]).then(data => {

        let produto = null;

        if (data.rows.length > 0)
          produto = data.rows.item(0);

        callbackSuccess(produto);
      }, error => {
        callbackError(error);
      });

    }
  }

}
