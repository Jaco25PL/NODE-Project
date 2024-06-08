const http = require('node:http') // We import http from node


    // Request handler function
const requestHandler = (req, res) => {

        // response status code 
    res.statusCode = 200

        // set content header to plain text
    res.setHeader('Content-Type', 'text/plain')

        // response message
    res.end('Hello you\n')

}


    // Create the server
const server = http.createServer(requestHandler)

    // Define the port to listen on
const port = 3000

    // Start the server
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})