import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

// Paginas da aplicação
import { ClientesPage } from '../pages/clientes/clientes';
import { MinhasVendasPage } from '../pages/minhas-vendas/minhas-vendas';
import { InicioPage } from '../pages/inicio/inicio';
import { PerfilPage } from '../pages/perfil/perfil';
import { SincronizarDadosPage } from '../pages/sincronizar-dados/sincronizar-dados';
import { NovaVendaPage } from '../pages/nova-venda/nova-venda';
import { BuscarClientePage } from '../pages/buscar-cliente/buscar-cliente';
import { AdicionarItemVendaPage } from '../pages/nova-venda/adicionar-item-venda/adicionar-item-venda';
import { BuscarProdutoPage } from '../pages/buscar-produto/buscar-produto';
import { FinalizarVendaPage } from '../pages/nova-venda/finalizar-venda/finalizar-venda';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { EditarParametroPage } from '../pages/configuracoes/editar-parametro/editar-parametro';
import { IntroducaoPage } from '../pages/introducao/introducao';
import { LoginPage } from '../pages/login/login';

// DAO - Data Access Object
import { ProdutoDAO } from '../dao/produto-dao';
import { MarcaDAO } from '../dao/marca-dao';
import { CategoriaDAO } from '../dao/categoria-dao';
import { PrateleiraDAO } from '../dao/prateleira-dao';
import { ParametroSistemaDao } from '../dao/parametro-sistema-dao';
import { VendedorDAO } from '../dao/vendedor-dao';
import { ClienteDAO } from '../dao/cliente-dao';
import { CidadeDAO } from '../dao/cidade-dao';
import { EstadoDAO } from '../dao/estado-dao';
import { FormaPagamentoDAO } from '../dao/forma-pagamento-dao';

// serviços
import { LoginWebService } from '../services/login-web-service';
import { ProdutosWebService } from '../services/produtos-web-service';
import { ClienteWS } from '../providers/cliente-ws';
import { FormasPagamentoWS } from '../providers/formas-pagamento-ws';
import { VendedorService } from '../services/vendedor-service';
import { ClienteService } from '../services/cliente-service';
import { FormaPagamentoService } from '../services/forma-pagamento-service';

// minhas bibliotecas
import { Util } from '../lib/util';
import { Globals } from '../global/globals';
import { JsonParser } from '../lib/json-parser';


@NgModule({
  declarations: [
    MyApp,
    MinhasVendasPage,
    ClientesPage,
    InicioPage,
    PerfilPage,
    SincronizarDadosPage,
    NovaVendaPage,
    BuscarClientePage,
    AdicionarItemVendaPage,
    BuscarProdutoPage,
    FinalizarVendaPage,
    ConfiguracoesPage,
    EditarParametroPage,
    IntroducaoPage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      menuType: 'push',
      platforms: {
        ios: {
          menuType: 'overlay'
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MinhasVendasPage,
    ClientesPage,
    InicioPage,
    PerfilPage,
    SincronizarDadosPage,
    NovaVendaPage,
    BuscarClientePage,
    AdicionarItemVendaPage,
    BuscarProdutoPage,
    FinalizarVendaPage,
    ConfiguracoesPage,
    EditarParametroPage,
    IntroducaoPage,
    LoginPage
  ],
  providers: [ProdutoDAO, MarcaDAO, CategoriaDAO, PrateleiraDAO, ParametroSistemaDao, VendedorDAO, ClienteDAO, CidadeDAO, EstadoDAO, FormaPagamentoDAO, LoginWebService, ProdutosWebService, ClienteWS, FormasPagamentoWS, VendedorService, ClienteService, FormaPagamentoService, Util, Globals, JsonParser]
})

export class AppModule { }
