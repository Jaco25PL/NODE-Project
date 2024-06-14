const http = require('http')
const url = require('url')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  // Parse the request URL
  const parsedUrl = url.parse(req.url, true)
  const pathname = parsedUrl.pathname
  const query = parsedUrl.query

  // Set the base response headers
  res.setHeader('Content-Type', 'application/json')

  // Define routes
  if (pathname === '/') {
    // Home route
    res.statusCode = 200
    res.end(JSON.stringify({ message: 'Welcome to the Home Page!' }))
  } else if (pathname === '/about') {
    // About route
    res.statusCode = 200
    res.end(JSON.stringify({ message: 'About Us' }))
  } else if (pathname === '/greet') {
    // Greet route with query parameters
    const name = query.name || 'Stranger'
    res.statusCode = 200
    res.end(JSON.stringify({ message: `Hello, ${name}!` }))
  } else {
    // 404 Not Found
    res.statusCode = 404
    res.end(JSON.stringify({ message: '404 - Page Not Found' }))
  }
})


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
