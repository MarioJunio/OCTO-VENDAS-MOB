export class ParametroSistema {

    public id: Number;
    public descricao: string;
    public valor: string;
    public categoria: Number;
    public tipo: string;
    public ativo: string;

    constructor(id: number, descricao: string, valor: string, categoria: number, tipo: string, ativo: string) {
        this.id = id;
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
        this.tipo = tipo;
        this.ativo = ativo;
    }

}