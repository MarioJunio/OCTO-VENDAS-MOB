export class Cliente {

    id: Number;
    nome: String;
    email: String;
    cpf: String;
    rg: String;
    fone1: String;
    fone2: String;
    cep: String;
    bairro: String;
    logradouro: String;
    numero: Number;
    complemento: String;
    cidade: any = {};
    cnpj: String;
    inscricaoEstadual: String;
    nomeFantasia: String;
    razaoSocial: String;
    dataAlteracao: String;

    public getEnderecoCompleto() {

        let temCidade: boolean = false;
        let cidadeEstado = '';

        if (this.cidade) {
            cidadeEstado = this.cidade.nome;

            if (this.cidade.estado) {
                cidadeEstado += ' ' + this.cidade.estado.uf;
            }

            temCidade = true;
        }

        return (this.logradouro || '') + ' ' + (this.numero || '') + ' ' + (this.bairro || '') + (temCidade ? ', ' + cidadeEstado : '');
        
    }

}
