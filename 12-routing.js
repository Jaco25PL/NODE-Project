const http = require('node:http')

// From the pokemon API
const dittoJSON = require('./pokemon/ditto.json')

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

          // Listen for the event data
          req.on('data' , chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // Call a data base to save the info
            res.writeHead(201 , { 'Content-Type': 'application/json; charset=utf-8' }) // The code 201 means that we add new info
            res.end(JSON.stringify(data)) // <- We return the same data to see how it works 
          })

          break
      
        default: 
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }

  }

}

const server = http.createServer(processRequest)


server.listen( port , () => {

  console.log(`Running server at http://localhost:${port}`)

} )