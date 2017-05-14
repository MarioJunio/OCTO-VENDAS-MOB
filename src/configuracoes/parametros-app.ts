export class AppParametros {

    public static categorias = {

        web_services: {
            id: 1,
            descricao: 'Web Services'
        },
        sincronizacao: {
            id: 2,
            descricao: 'Sincronização de dados'
        }

    };

    public static tiposParametro = {
        text: 1,
        data: 2,
        booleano: 3,
        opcao: 4
    }

    public static parametros = {

        web_service: {
            id: 1,
            descricao: 'Endereço do WebService na nuvem',
            valor: 'http://192.168.1.4:8090/',
            categoria: AppParametros.categorias.web_services.id,
            tipo: AppParametros.tiposParametro.text,
            ativo: true
        },
        sincronizacao_cliente: {
            id: 2,
            descricao: 'Data da última sincronização dos clientes',
            valor: '0',
            categoria: AppParametros.categorias.sincronizacao.id,
            tipo: AppParametros.tiposParametro.data,
            ativo: false
        },
        sincronizacao_produtos: {
            id: 3,
            descricao: 'Data da última sincronização dos produtos',
            valor: '0',
            categoria: AppParametros.categorias.sincronizacao.id,
            tipo: AppParametros.tiposParametro.data,
            ativo: false
        },
        sincronizaca_formas_pagamento: {
            id: 4, 
            descricao: 'Data da última sincronização das formas de pagamento',
            valor: '0',
            categoria: AppParametros.categorias.sincronizacao.id,
            tipo: AppParametros.tiposParametro.data,
            ativo: false
        }
    }

    public static getParametrosCategoria(categoriaId: Number) {

        let parametros: any[];

        Object.keys(AppParametros.parametros).forEach(key => {

            let parametro = AppParametros[key];

            if (parametro.categoria === categoriaId) {
                parametros.push(parametro);
            }

        });

        return parametros;
    }
}