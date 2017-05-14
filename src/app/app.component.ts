import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilPage } from '../pages/perfil/perfil';
import { SincronizarDadosPage } from '../pages/sincronizar-dados/sincronizar-dados';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { IntroducaoPage } from '../pages/introducao/introducao';

// DAO
import { ParametroSistemaDao } from '../dao/parametro-sistema-dao';
import { ProdutoDAO } from '../dao/produto-dao';
import { CategoriaDAO } from '../dao/categoria-dao';
import { MarcaDAO } from '../dao/marca-dao';
import { PrateleiraDAO } from '../dao/prateleira-dao';
import { VendedorDAO } from '../dao/vendedor-dao';
import { CidadeDAO } from '../dao/cidade-dao';
import { EstadoDAO } from '../dao/estado-dao'
import { FormaPagamentoDAO } from '../dao/forma-pagamento-dao';

// services
import { VendedorService } from '../services/vendedor-service';

// cache
import { Globals } from '../global/globals';

@Component({
  templateUrl: 'app.html'
  })

  export class MyApp {

    inicio = InicioPage;
    meuPerfil = PerfilPage;
    sincronizarDados = SincronizarDadosPage;
    configuracoes = ConfiguracoesPage;
    introducao = IntroducaoPage;

    rootPage;

    constructor(platform: Platform, public globals: Globals, public paramSistemaDAO: ParametroSistemaDao, public produtoDAO: ProdutoDAO, public categoriaDAO: CategoriaDAO, public marcaDAO: MarcaDAO, public prateleiraDAO: PrateleiraDAO, public vendedorDAO: VendedorDAO, public cidadeDAO: CidadeDAO, public estadoDAO: EstadoDAO, public formaPagamentoDAO: FormaPagamentoDAO, public vendedorService: VendedorService) {

      //this.rootPage = InicioPage;

      platform.ready().then(() => {
        StatusBar.styleDefault();
        //Splashscreen.show();
        });

      }

      ngOnInit() {

        setTimeout(() => {
          this.carregarVendedor();
          }, 1000);

        }

        public abrirPagina(pagina) {
          this.rootPage = pagina;
        }

        /**
        * Verifica se existe algum vendedor ativo, caso não exista exibir tela de configuração
        */
        private carregarVendedor() {

          this.vendedorService.buscarVendedorAtivo().then(data => {

            // se encontrou algum vendedor ativo
          if (data.rows.length > 0) {

              // vendedor ativo
              let vendedor = data.rows.item(0);

                // atribui vendedor ativo ao cache da aplicação
              this.globals.setVendedor(vendedor);
              this.rootPage = this.inicio;

          } else {
              this.rootPage = this.introducao;
          }

     }).catch(reason => {
          alert('Aplicação não foi inicializada corretamente! ' + JSON.stringify(reason));
     });

  }

}
