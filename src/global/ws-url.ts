export class Url {

  public static readonly LOGIN_WS = '/login/';

  public static readonly CONSULTA_STATUS_SINC_PRODUTOS_WS = '/produtos/chsincprod/';
  public static readonly SINC_PRODUTOS_WS = '/produtos/sincprod/';

  public static readonly CONSULTA_STATUS_SINC_CLIENTES_WS = '/clientes/statusSincClientes/';
  public static readonly SINC_CLIENTES_WS = '/clientes/buscar/';

  public static readonly CONSULTA_STATUS_SINC_FORMAS_PAGAMENTO_WS = '/formasPag/statusSincronizacao/';
  public static readonly SINC_FORMAS_PAGAMENTO_WS = '/formasPag/buscar/';

  public static fix(url: String) {

    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    return url;
  }

}
