// To use our API that finds avaliable ports, we've create an http protocol that will create a server and then, 
// instead of defined a port ,we called our API and use it as the port when this promise is resolved

const http = require('node:http')
const { findFreePort } = require('./8-Find-new-port.js')

const desiredPort = process.env.PORT ?? 3000    // Our desired port is 3000 if no one desired port is defined
                                                // To define one, specify it in the CLI -> PORT=1234 node 9-Find...

const server = http.createServer( (req, res) => {
    console.log('Request received')
    res.end('Hello my frind')
})

findFreePort( desiredPort ).then( port => {
    server.listen( port , () => {
        console.log(`Server running at http://localhost:${port}`)
    })
})