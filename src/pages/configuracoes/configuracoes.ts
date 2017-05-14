import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { AppParametros } from '../../configuracoes/parametros-app';
import { EditarParametroPage } from './editar-parametro/editar-parametro';
import { ParametroSistemaDao } from '../../dao/parametro-sistema-dao';

@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})

export class ConfiguracoesPage {

  public categorias: any[];
  public parametros: any[];

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public parametroSistemaDao: ParametroSistemaDao) { }

  ngOnInit() {
    this.carregarParametros();
    this.carregarCategorias();
  }

  public getParametrosPorCategoria(categoriaID) {

    let parametrosEncontrados = [];

    for (let p of this.parametros) {

      if (p.categoria == categoriaID) {
        parametrosEncontrados.push(p);
      }
    }

    return parametrosEncontrados;
  }

  // edita o parâmetro
  public editar(p) {

    // se a edicao do parametro for do tipo texto ou data, então abra uma nova janela para edição
    if (p.tipo == AppParametros.tiposParametro.text || p.tipo == AppParametros.tiposParametro.data) {

      // redireciona para a página de edição, passando o parametro como argumento de navegação
      this.navCtrl.push(EditarParametroPage, { parametro: p });
    }

  }

  public close() {
    this.viewCtrl.dismiss();
  }

  private carregarParametros() {
    this.parametros = [];

    this.parametroSistemaDao.todos().then(data => {

      // verifica se existe parametros cadastrados
      if (data.rows.length > 0) {

        // itera sobre a lista de parametros encontrados e adiciona cada parametro na lista
        for (let i = 0; i < data.rows.length; i++) {
          this.parametros.push(data.rows.item(i));
        }
      }

    }).catch(error => {
      alert('Não foi possível carregar todos os parâmetros');
    });

  }

  private carregarCategorias() {
    this.categorias = [];

    // itera sobre as categorias e adiciona cada uma na lista
    Object.keys(AppParametros.categorias).forEach(key => {
      this.categorias.push(AppParametros.categorias[key]);
    });
  }

}
