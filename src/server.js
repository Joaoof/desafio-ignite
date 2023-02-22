import http from  'node:http'

/* 
1. Criação de uma task
2. Listagem de todas as taks
3. Atualização de todas as taks pelo id
4. Remover uma task pelo id
5. MArcar pelo id uma task completa

*/
const tasks = []

const server = http.createServer((req, res) => {

  const { method, url } = req

  if(method == 'GET' && url == '/tasks') {
    return res
    .setHeader('Content-type', 'application/json')
    .end(JSON.stringify(tasks))
  }

  if(method == 'POST' && url == '/tasks') {

    tasks.push({
      id: 1,
      title: 'Programação',
      description: 'Estudo do curso ignite'
    })

    return res.end("Criação de task")
  }

  return res.end('Ei, cidadão')
})

server.listen(3334)