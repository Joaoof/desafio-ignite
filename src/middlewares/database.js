export class Database {
  #database = {}

  select(table) {
    const data = this.#database[table] ?? []

    return data
  } // tabela que quero selecionar, e ele vai retornar todos os dados contido dentro desta tabela.
 
  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    } // a gente vai verificar se existi um registro inserido naquela tabela alí

    return data;
  } // Esse insert vai receber a tabela do banco que eu qeuro fazer inserção e, os dados também.
}