import http from  'node:http'

/* 
1. Criação de uma task
2. Listagem de todas as taks
3. Atualização de todas as taks pelo id
4. Remover uma task pelo id
5. MArcar pelo id uma task completa

*/
const tasks = []

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if(method == 'GET' && url == '/tasks') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(tasks))
  }

  if(method == 'POST' && url == '/tasks') {

    const { title, description } = req.body

    tasks.push({
      id: 1,
      title,
      description,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3334)