// This is to find an avaliable port if the desired port passed by parameter is already in use

const net = require('node:net')

function findFreePort ( desiredPort ) {

    return new Promise(( resolve, reject ) => {

        const server = net.createServer() // Create the server using net

        server.listen( desiredPort , () => {
            const { port } = server.address() // get the current port destructuring it
            server.close(() => {
                resolve(port) // Close and resolve the server with the port
            })
        }) 


        server.on( 'error' , (err) => {
            if (err.code === 'EADDRINUSE' ) { // Port in use error code
                findFreePort(0).then(port => resolve(port)) // If there is a port in use we use 0 and then resolv it
            } else {
                reject(err) // If there is another kind of errpr
            }
        })
    })

}

module.exports = { findFreePort }