const fs = require('node:fs')

// This is how we handle asynchronous function, here we are usinf files as example
// (err, text) are the callbacks of this function, when is done the callback is loaded and 
// what is inside the function runs

fs.readFile('./text-example.txt', 'utf-8', (err, text) => {

    console.log(text)
}) 