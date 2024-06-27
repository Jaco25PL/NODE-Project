const express = require('express')
const dittoJSON = require('./pokemon/ditto.json')

const app = express()
app.disable('x-powered-by')
const PORT = process.env.PORT ?? 1234


app.use((req , res, next) => {

    if (req.method !== 'POST') return next()
    if (req.headers['content-type'] !== 'application/json') return next() // Look that is HEADERS (plural)

    // Only if we have a POST and Content Type equals to JSON the request will enter here
    let body = ''

    // While the request is on we listen for the 'data' event. This will listen for any kind of data being send or recevied
    req.on('data', chunk => {
        body += chunk.toString() // -> As the chunks arrive we store them in the body variable
    })

    req.on('end' , () => {

        // When there's no more data, the event 'end' will run, so we can parse the string to json at once

        const data = JSON.parse(body)
        // and finally we save the data in the body of the request
        req.body = data
        next()
    })

})


app.get('/pokemon/ditto', ( req , res ) => {
    res.json(dittoJSON) // -> Return the json
})

app.post('/pokemon', (req, res) => {

    // Here we should save in the data base 

    // So now we have the info in the req.body as we specified in the middleware
    res.status(201).json(req.body)

})

// Global error handling for 404 not found
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>')
})


app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
