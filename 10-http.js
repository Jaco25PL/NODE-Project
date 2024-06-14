const http = require('node:http')

const desiredPort = process.env.PORT ?? 0

const processRequest = (req, res) => {

    res.setHeader('Content-Type', 'text/html ; charset=utf-8')

    if (req.url === '/') {
        res.statusCode = 200
        res.end( '<h1>Welcome to the site</h1>' )
    } else if (req.url === '/contact' ) {
        res.statusCode = 200
        res.end( '<h1>Contacts</h1>' )
    } else {
        res.statusCode = 404
        res.end( '<h1>404 - Page not found :(</h1>' )
    }
}

const server = http.createServer(processRequest)

server.listen( desiredPort , () => {
    const { port } = server.address()
    console.log( `Running at http://localhost:${port}` )
} )