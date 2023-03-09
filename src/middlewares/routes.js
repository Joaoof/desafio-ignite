import { randomUUID} from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [ // array de rotas
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      console.log(req.query)

      const tasks = database.select('tasks') // buscar todas as informação 
    
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description,
      created_at: new Date(),
      update_at: new Date(),
      complete_at: null
    }


    database.insert('tasks', task)

    return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

    const { id } = req.params 
    const { title, description } = req.body

    database.update('tasks', id, {
      title,
      description,
    })

  

    return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

    const { id } = req.params 

    database.delete('tasks', id)

    return res.writeHead(204).end()
    }
  }
] 