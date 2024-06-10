// An ls command is a command to get all the directory's files

//      -> Enhanced LS, using FS - PATH - PROCESS
const fs = require('node:fs/promises')
const path = require('node:path')
const pico = require('picocolors') // -> Dependency to paint the console.log

const folder = process.argv[2] ?? '.' //  Save the file (or current file) passed

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder) // <- Get each file in the directory in an array
    } catch (error) {
        console.error(`${pico.red('Error reading the directory')} ${pico.magenta(folder)}`)
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)

        let fileInfo // <- To then save the info of each file

        try {
            fileInfo = await fs.stat(filePath)
        } catch (error) {
            console.log(`${pico.red("Couldn't read the file:")} ${pico.magenta(filePath)}`)
            process.exit(1)
        }

        const isDir = fileInfo.isDirectory()
        const fileType = isDir ? pico.yellow('d') : pico.green('f')
        const fileSize = fileInfo.size.toString()
        const lastFileModified = fileInfo.mtime.toLocaleString()
        return `${fileType} ${file.padEnd(20)} ${pico.blue(fileSize.padStart(10))} ${pico.magenta(lastFileModified)}`
    })

    // padEnd and padStart is to create a gap between a text and the other, just to see it better

    const filesInfo = await Promise.all(filesPromises) // <- As is a primise we need to use Promise.all

    filesInfo.forEach(fileInfo => console.log(fileInfo)) // <- Show each one in a console.log
}

ls(folder)
