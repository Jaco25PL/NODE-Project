const jsonDitto = require('./pokemon/ditto.json')
const express = require('express')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

app.get('/pokemon/ditto', ( req , res ) => { // => Directly go to GET method

    res.json(jsonDitto) // <= the same as -> return res.end(JSON.stringify(dittoJSON))

})


app.post('/pokemon', (req , res) => {
    let body = ''

    // Listen for the event data
    req.on('data' , chunk => {
        body += chunk.toString()
    })

    req.on('end', () => {
        const data = JSON.parse(body)
        // Call a data base to save the info
        
        res.status(201).json(data) // <- We return the same data to see how it works 
    })

})

// at the end we can handle the errors, using use to do it globally

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})



app.listen(PORT , () => {
    console.log(`Running on http://localhost:${PORT}`)
})
