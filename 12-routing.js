const http = require('node:http')

// From the pokemon API
const dittoJSON = require('/pokemon/ditto.json')

const port = 3210

const processRequest = (req , res) => {

  const { method , url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type' , 'application/json' , 'charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default :
          res.statusCode = 404
          return res.end('<h1>Error 404</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': // => create a new pokemon
          let body = ''
      }

  }

}

const server = http.createServer(processRequest)


server.listen( port , () => {

  console.log(`Running server at http://localhost:${port}`)

} )