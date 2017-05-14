export class DAO {

    public database: String = 'app-vendas.db';
    public location: String = 'default';

    // transforma as propriedades do objeto json, em sql para inserção ou projeção
    public colunasToSQL(colunas: Object) {

        let properties = Object.keys(colunas);

        let sql = '';

        if (properties.length > 0) {

            for (let propertie of properties) {
                sql += colunas[propertie] + ',';
            }

        }

        if (sql != '') {
            return sql.substring(0, sql.length - 1);
        }

        return null;
    }

    /**
     * Itera atraves dos número de propriedades do objeto json, para transformar em parâmetro SQL "?"
     */
    public colunasParametrosToSQL(colunas: Object) {

        let properties = Object.keys(colunas);

        let sql = '';

        if (properties.length > 0) {

            for (let propertie of properties) {
                sql += '?,';
            }

        }

        if (sql != '') {
            return sql.substring(0, sql.length - 1);
        }

        return null;
    }

    public montarUpdate(tabela, colunas) {

        let properties = Object.keys(colunas);

        let sql = 'UPDATE ' + tabela + ' SET ';

        if (properties.length > 0) {

            for (let propertie of properties)
                sql += propertie + ' = ?,';
            
            return sql.substring(0, sql.length - 1);
        }

        return null;
    }
}