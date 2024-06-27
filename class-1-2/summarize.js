// Importing the built-in 'http' module to create an HTTP server
const http = require('http')

// Setting the hostname and port number for the server
const hostname = '127.0.0.1'
const port = 3000

// Creating an HTTP server instance
const server = http.createServer((req, res) => {
  // Setting the status code to 200 to indicate a successful response
  res.statusCode = 200
  // Setting the Content-Type header to plain text
  res.setHeader('Content-Type', 'text/plain')
  // Sending the response body with a message
  res.end('Hello, World!\n')
})

// Making the server listen on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// ----------------------------------------------------------------------------

// Importing the built-in 'fs' module to interact with the file system
const fs = require('fs')

// Reading the contents of a file named 'example.txt'
fs.readFile('example.txt', 'utf-8', (err, data) => {
  if (err) {
    // If an error occurs, log it to the console
    console.error(err)
    return
  }
  // Log the contents of the file to the console
  console.log(data)
})

// Writing some content to a file named 'example.txt'
const newContent = 'Some content to write to the file'

fs.writeFile('example.txt', newContent, err => {
  if (err) {
    // If an error occurs, log it to the console
    console.error(err)
    return
  }
  // Log a success message to the console
  console.log('File has been written')
})

// ----------------------------------------------------------------------------

// Creating a simple module to greet users
module.exports = function(name) {
  return `Hello, ${name}!`
}

// Using the 'greet' module created above
const greet = require('./greet')

// Log the greeting message to the console
console.log(greet('World')) // Output: Hello, World!

// ----------------------------------------------------------------------------

// Importing the 'express' module to create an Express application
const express = require('express')
const app = express()
const port_2 = 3000

// Defining a route for the root URL that sends a 'Hello, World!' message
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// Making the Express app listen on the specified port (port_2)
app.listen(port_2, () => {
  console.log(`Server is running on http://localhost:${port_2}`)
})

// Function that returns a promise which resolves after 1 second
const doSomethingAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Async operation complete')
    }, 1000)
  })
}

// Using the promise with then/catch for asynchronous operation
doSomethingAsync()
  .then(result => {
    console.log(result) // Output: Async operation complete
  })
  .catch(err => {
    console.error(err)
  })

// Function that uses async/await to handle asynchronous operation
const main = async () => {
  try {
    const result = await doSomethingAsync()
    console.log(result) // Output: Async operation complete
  } catch (err) {
    console.error(err)
  }
}

// Calling the async function
main()


/*
This code block includes several examples:

Creating a simple HTTP server
Reading and writing files
Creating and using a module
Setting up an Express server
Handling asynchronous operations using Promises and async/await

*/
