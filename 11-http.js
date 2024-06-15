const http = require('http')

// Define the hostname and port where the server will listen
const hostname = '127.0.0.1'
const port = 3000

const process = (req, res) => {
  // Set the response header with HTTP status and content type
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')

  // Send the response body
  res.end('Hello freinds to my server\n')
}

// Create the HTTP server
const server = http.createServer( process )

// Make the server listen on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
