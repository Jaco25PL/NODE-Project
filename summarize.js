// Creating a Simple HTTP Server

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// ------------------------------------------------------

// Reading and Writing Files

// Reading a file
const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Writing a file

const fs = require('fs');

const content = 'Some content to write to the file';

fs.writeFile('example.txt', content, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('File has been written');
});

//  Asynchronous Programming with Promises and Async/Await

// Using Promises:

const doSomethingAsync = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Async operation complete');
      }, 1000);
    });
  };
  
  doSomethingAsync().then(result => {
    console.log(result); // Output: Async operation complete
  }).catch(err => {
    console.error(err);
  });
  

  // Using Async/Await:

  const doSomethingAsync2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Async operation complete');
      }, 1000);
    });
  };
  
  const main = async () => {
    try {
      const result = await doSomethingAsync2();
      console.log(result); // Output: Async operation complete
    } catch (err) {
      console.error(err);
    }
  };
  
  main();
  

// With express (install it first)

// creating a basic express server

const express = require('express');
const app = express();
const porto = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(porto, () => {
  console.log(`Server is running on http://localhost:${porto}`);
});
