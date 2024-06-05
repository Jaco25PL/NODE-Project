const fs = require('node:fs/promises')

fs.readFile('./text-example.txt' , 'utf-8')
    .then( text => {
        console.log(text)
    })