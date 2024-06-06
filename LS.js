// An ls command is a command to get all the directory's files


//      -> Basic LS command

// const fs = require('node:fs')
// const dir = process.argv[2] ?? '.' //<- argv will see the third thing texted in the command, [node , LS.js , directory name] for example
// fs.readdir(dir , (err, files) => {
//     if (err) console.error('Error reading files' , err)

//     files.forEach( file => console.log(file))
// })


//      -> The same tahan above but using promises
// const fs = require('node:fs/promises')
// fs.readdir('.') // <- read direcory and the dot means the current one
//     .then(files => {
//         files.forEach( file => {
//             console.log(file)
//         })
//     })
//     .catch( err => {
//         if (err) {
//             console.error('Error reading directory', err)
//             return
//         }
//     })


//      -> Enhanced LS, using FS - PATH - PROCESS
const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.' //Save the file (or current file) passed 

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder) // <- Get each file in the directory in an array
    } catch (error) {
        console.error(`Error reading the directory ${folder}`)
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)

        let fileInfo // <- To then save the info of each file

        try {
            fileInfo = await fs.stat(filePath)
        } catch (error) {
            console.log(`Couldn't read the file: ${filePath}`)
            process.exit(1)
        }

        const isDir = fileInfo.isDirectory()
        const fileType = isDir ? 'd' : 'f'
        const fileSize = fileInfo.size.toString()
        const lastFileModified = fileInfo.mtime.toLocaleString()
        
        return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${lastFileModified}`
    })

    // padEnd and padStart is to create a gap between a text and the other, just to see it better

    const filesInfo = await Promise.all(filesPromises) // <- As is a primise we need to use Promise.all

    filesInfo.forEach( fileInfo => console.log( fileInfo )) // <- Show each one in a console.log
}

ls(folder)