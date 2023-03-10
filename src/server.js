import http from  'node:http'
import { json } from './middlewares/json.js'
import { routes } from './middlewares/routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'

/* 
1. Criação de uma task
2. Listagem de todas as taks
3. Atualização de todas as taks pelo id
4. Remover uma task pelo id
5. MArcar pelo id uma task completa

*/

const server = http.createServer(async (req, res) => {

  const { method, url } = req

  await json(req, res)

  const route = routes.find(route => {
    return route.method == method && route.path.test(url)
  })

  if (route) {
    const routeParams = req.url.match(route.path)

    // console.log(extractQueryParams(routeParams.groups.query))

    const { query, ...params } = routeParams.groups

      req.params = params
      req.query = query ? extractQueryParams(query) : {}

    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3334)