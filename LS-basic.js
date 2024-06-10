
    // -> Basic LS command

const fs = require('node:fs')
const dir = process.argv[2] ?? '.' //<- argv will see the third thing texted in the command, [node , LS.js , directory name] for example
fs.readdir(dir , (err, files) => {
    if (err) return console.error('Error reading files' , err)

    files.forEach( file => console.log(file))
})


    // -> The same tahan above but using promises
const fs = require('node:fs/promises')
fs.readdir('.') // <- read direcory and the dot means the current one
    .then(files => {
        files.forEach( file => {
            console.log(file)
        })
    })
    .catch( err => {
        if (err) {
            console.error('Error reading directory', err)
            return
        }
    })
