const fs = require('node:fs/promises');

// fs.readFile('./text-example.txt' , 'utf-8')
//     .then( text => {
//         console.log(text)
//     })

    
// Want to use await? we've to an IIFE
;( //<-- It's important to use the semi-colon 
    async () => {
        const text = await fs.readFile('./text-example.txt' , 'utf-8')
        console.log(text)
    }
)()

