import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./text-example.txt' , 'utf-8'),
    readFile('./text-example-2.txt' , 'utf-8'),
]).then(([ text, secondText  ]) => {
    console.log(text)
    console.log(secondText)
})