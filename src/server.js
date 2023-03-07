import http from  'node:http'
import { Database } from './middlewares/database.js'
import { json } from './middlewares/json.js'

/* 
1. Criação de uma task
2. Listagem de todas as taks
3. Atualização de todas as taks pelo id
4. Remover uma task pelo id
5. MArcar pelo id uma task completa

*/
const database = new Database()

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  if(method == 'GET' && url == '/tasks') {
    const tasks = database.select('tasks') // buscar todas as informação 
    
    return res.end(JSON.stringify(tasks))

    // * Só que se eu inicio meu servidor eu perco minha criação de task (tarefa)
  }

  if(method == 'POST' && url == '/tasks') {


    const { title, description } = req.body

    const task = {
      id: 1,
      title,
      description,
    }

    database.insert('tasks', task)

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3334)