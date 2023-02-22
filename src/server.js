import http from  'node:http'

const server = http.createServer((req, res) => {
  return res.end('Ei, cidadão')
})

server.listen(4444)