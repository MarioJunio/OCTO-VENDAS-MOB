import { Injectable } from '@angular/core';
import { ParametroSistemaDao } from '../dao/parametro-sistema-dao';
import { Platform } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppParametros } from '../configuracoes/parametros-app';
import { ParametroSistema } from '../model/parametro-sistema';
import { ProdutoDAO } from '../dao/produto-dao';
import { PrateleiraDAO } from '../dao/prateleira-dao';
import { MarcaDAO } from '../dao/marca-dao';
import { CategoriaDAO } from '../dao/categoria-dao';
import { VendedorDAO } from '../dao/vendedor-dao';
import { Url } from '../global/ws-url';
import { WebService } from './web-service';
import { Globals } from '../global/globals';

@Injectable()
export class ProdutosWebService extends WebService {

  public constructor(public globals: Globals, public vendedorDAO: VendedorDAO, public parametroSistemaDao: ParametroSistemaDao, public produtoDao: ProdutoDAO, public marcaDao: MarcaDAO, public prateleiraDao: PrateleiraDAO, public categoriaDao: CategoriaDAO, public platform: Platform, public http: Http) {
    super(platform, http, globals, vendedorDAO);
  }

  // verifica se há algum produto para ser sincronizado com o app mobile
  public checaSincronizacaoProdutos(responseOk, responseError) {

    this.parametroSistemaDao.buscar(AppParametros.parametros.web_service.id).then(data => {

      let urlWS = Url.fix(data.rows.item(0).valor);

      // buscar parâmetro data última sincronização dos produtos
      this.parametroSistemaDao.buscar(AppParametros.parametros.sincronizacao_produtos.id).then(data => {

        // data da ultima sincronizacao dos produtos realizada no mobile
        let paramDataSincProdutos = data.rows.item(0).valor;

        let url = urlWS + Url.CONSULTA_STATUS_SINC_PRODUTOS_WS + paramDataSincProdutos;

        this.http.get(url, {
          headers: super.getBasicAuthHeader()
        }).subscribe(data => {
          responseOk(data);
        }, (error) => {
          responseError(error);
        });

      }).catch(error => {
        alert('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.sincronizacao_produtos.id);
      });

    }).catch(error => {
      alert('Não foi possível buscar o parâmetro de código: ' + AppParametros.parametros.web_service.id);
    });
  }

  public sincronizaProdutos(callback, callbackError) {

    this.produtoDao.buscarTodosParaSincronizacao(produtos => {

      this.parametroSistemaDao.buscar(AppParametros.parametros.web_service.id).then(data => {

        let urlWS = Url.fix(data.rows.item(0).valor) + Url.SINC_PRODUTOS_WS;
        let params = JSON.stringify(produtos);

        let httpHeaders = super.getBasicAuthHeader();
        httpHeaders.append('Content-Type', 'application/json');

        this.http.post(urlWS, params, {
          headers: httpHeaders
        }).subscribe((data) => {

          // transforma em json os produtos a serem sincronizados
          let resJson = JSON.parse(data.text());

          // itera sobre os produtos a serem sincronizados, e salva no banco de dados
          for (let produto of resJson.produtos) {
            this.salvar(produto, callbackError);
          }

          // atualiza parâmetro 'última sincronização dos produtos'
          this.parametroSistemaDao.atualizar(AppParametros.parametros.sincronizacao_produtos.id, resJson.dataSincronizacao).then(() => {
          }).catch(error => {
            callbackError(error);
          });

        }, (error) => {
          callbackError("Não foi possível sincronizar os produtos: " + JSON.stringify(error));
        });

      }).catch(error => {
        alert('Não foi possível buscar ');
      });

    }, (error) => {
      callbackError('Não foi possível buscar os produtos: ' + JSON.stringify(error));
    })

  }

  /**
  * Salva o produto e suas dependencias caso exista
  */
  private salvar(produto, callbackError) {

    // busca a marca do produto ou insere, caso nao exista
    this.marcaDao.buscar(produto.marca.id, (marca) => {

      // verifica se a marca existi, se não salve-a
      if (marca == null) {

        this.marcaDao.salvar(produto.marca, (data) => {
          // Marca salva
        }, (error) => {
          // alert('Não foi possível salvar a Marca: ' + JSON.stringify(error) + '\n' + 'Marca: ' + produto.marca.id + ' : ' + produto.marca.nome);
        });
      }

    });

    // busca a prateleira, caso nao exista salve-a
    this.prateleiraDao.buscar(produto.prateleira.id, (prateleira) => {

      if (prateleira == null) {

        this.prateleiraDao.salvar(produto.prateleira, (data) => {
          // Prateleira salva
        }, (error) => {
          // alert('Erro ao salvar prateleira: ' + JSON.stringify(error));
        });
      }

    });

    // busca a categoria, caso nao exista salve-a
    this.categoriaDao.buscar(produto.categoria.id, categoria => {

      if (categoria == null) {

        // alert('Salvar categoria: ' + produto.categoria.id + ' - ' + produto.categoria.nome);

        this.categoriaDao.salvar(produto.categoria, data => {
          // Categoria Salvar
        }, error => {
          // alert('Error ao salvar categoria: ' + JSON.stringify(error));
        })
      }
    })

    // busca o produto
    this.produtoDao.buscar(produto.id, prod => {

      // se o produto não existe cadastre-o, caso contrario edite-o
      if (prod == null) {

        this.produtoDao.salvar(produto, data => {
          // produto salvo com sucesso
        }, error => {
          callbackError('Não foi possível salvar o produto: ' + JSON.stringify(error));
        });

      } else {

        this.produtoDao.editar(produto, data => {
          // produto editado com sucesso
        }, error => {
          callbackError('Não foi possível editar o produto: ' + JSON.stringify(error));
        });
      }

    }, error => {
      callbackError('Não foi possível buscar o produto: ' + JSON.stringify(error));
    });

  }

}
