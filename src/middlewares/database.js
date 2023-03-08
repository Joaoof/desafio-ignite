import fs from 'node:fs/promises'

const databasePath = new URL('../../db.json', import.meta.url)
export class Database {
  #database = {} 

  constructor() { // recuperar os dados quamdo a aplicação inicializar
    fs.readFile(databasePath, 'utf8')
    .then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
  })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  } // e o que vai escrever nosso banco de dados em um arq físico

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

    this.#persist();

    return data;
  } // Esse insert vai receber a tabela do banco que eu qeuro fazer inserção e, os dados também.

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id == id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }
}