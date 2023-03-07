import { randomUUID} from 'node:crypto'
import { Database } from "./database.js"
const database = new Database()


export const routes = [ // array de rotas
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks') // buscar todas as informação 
    
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      
    const { title, description } = req.body

    const task = {
      id: randomUUID(),
      title,
      description,
    }

    database.insert('tasks', task)

    return res.writeHead(201).end()
    }
  }
] 