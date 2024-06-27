import fs from 'node:fs/promises';

// To use await out of an async function, we've to use an ES MODULE 

const text = await fs.readFile('./text-example.txt' , 'utf-8')

console.log(text)