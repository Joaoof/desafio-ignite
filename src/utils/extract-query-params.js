// ['search=NodeJS', 'page=2'] --> se localizando!

// ['search', 'João']
// ['page', '2']

export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {})
}