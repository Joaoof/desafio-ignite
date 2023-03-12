import { randomUUID} from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from '../utils/build-route-path.js'

const database = new Database()

export const routes = [ // array de rotas
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      
      
    const { title, description } = req.body


    // if(title == 0 || description == 0) {
    //   return res.writeHead(404).end(JSON.stringify({ message: 'title and description are required' }))
    // }

    if(!title || !description ) {
      return res.writeHead(404).end()
    }

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
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      const { search } = req.query

      const tasks = database.select('tasks', {
        title: search,
        description: search,
      }) // buscar todas as informação 
    
      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

    const { id } = req.params 
    const { title, description } = req.body


    if(!title || !description ) {
      return res.writeHead(404).end()
    }
    
    if(!title || !description) {
    return res.writeHead(400).end(
      JSON.stringify({ message: 'title or description are required' }))
   }

   const [ task ] = database.select('tasks', { id })

   if(!task) {
    return res.writeHead(404).end()
   }    
    
   
    database.update('tasks', id, {
      title,
      description,
      update_at: new Date()
      
    })


    return res.writeHead(204).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {

    const { id } = req.params 
    
    const [tasks] = database.select('tasks', {id})

    
    if(!tasks) {
      return res.writeHead(404).end()
    } 
    
  
  database.delete('tasks', id)
  
  return res.writeHead(204).end()
  }
  },
{
  method: 'PATCH',
  path: buildRoutePath('/tasks/:id/complete'),
  handler: (req, res) => {

  const { id } = req.params  


  const [ tasks ] = database.select('tasks', { id })

  if (!tasks) {
    return res.writeHead(400).end(
      JSON.stringify({ message: 'task não existente dentro do banco de dados!' }))
  }

  // código para marcar a task como completa ou não

  
  const isTaskCompleted = !!tasks.completed_at
  const completed_at = isTaskCompleted ? null : new Date()

  database.update('tasks', id, { completed_at })

  return res.writeHead(204).end()

 
  }
}
] 