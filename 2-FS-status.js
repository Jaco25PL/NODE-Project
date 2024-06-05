// fs stands for file system, of course

const fs = require('node:fs')

const text = fs.readFileSync('./text-example.txt', 'utf-8')

console.log(text)