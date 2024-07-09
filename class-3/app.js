const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

// Serve static files from the "public" directory
app.use(express.static('public'))

const {validateMovie, validatePartialMovie} = require('./schemas/movies')
const PORT = process.env.PORT ?? 1234

// ENDPOINT For a request with that URL we'll return the entire json file with all the movies
// app.get('/movies' , (req, res) => {
    // res.header('Access-Control-Allow-Origin', '*')

//     res.json(movies)

// })

// ENDPOINT using params - We could us regex, and path-to-regex also instead of the url
app.get('/movies/:id' , (req , res) => {
    

    const { id } = req.params // => Get the ID param from the request
    const movie = movies.find(movie => movie.id === id) // Find the id movie using js
    if (movie) return res.json(movie)   // Return the movie if it was found 

    res.status(404).json({ message: 'Movie not found'})
})

// ENDPOINT wiht query string, in this case we're gonna filter by genre
app.get('/movies' , (req, res) => {

    res.header('Access-Control-Allow-Origin', '*')

    const { genre, director, title } = req.query // Using query, express will detect if there is any query (query -> genre=something)
    if(genre) { // If there is a query with that name we proceed
        
        const filteredByGenre = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // => we use some instead of includes because of case sensitive and because genre is an array
        )
        return res.json(filteredByGenre)
    }

    if (director) {
        const filteredByDirector = movies.filter(
            movie => movie.director.toLowerCase().includes(director.toLowerCase())
        )
        return res.json(filteredByDirector)
    }

    if(title) {
        const filteredByTitle = movies.filter(
            movie => movie.title.toLowerCase().includes(title.toLowerCase())
        )
        return res.json(filteredByTitle)
    }

    res.json(movies) // If there is no query we return all the movies
})


// POST ENDPOINT to add a new resource to the database
app.post('/movies', (req, res) => {

    // WITHOUT ZOD, VALIDIDATIONS AND THE EXPRESS JSON MIDDLEWARE
    // let body = ''

    // req.on('data', chunk => {
    //     body += chunk.toString()
    // })

    // req.on('end' , () => {
    //     const data = JSON.parse(body)
    
    //     const {
    //         title,
    //         year,
    //         director,
    //         duration,
    //         poster,
    //         genre,
    //         rate
    //     } = data

    //     const newMovie = {
    //         id: crypto.randomUUID(),
    //         ...data
    //     }

    //     movies.push(newMovie)
    //     res.status(201).json(newMovie)
    // })

    const result = validateMovie(req.body)
    if (!result.success) {
        return res.status(400).json({ error : JSON.parse(result.error.message) })
    }
    
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie) // push to the database    
    res.status(201).json(newMovie)
})

app.patch('/movies/:id' , (req , res ) => {

    const result = validatePartialMovie(req.body) // Use the same schema but using partial in ZOD, this means that every element is optional
    if ( !result.success ) {
        return res.status(400).json({ error : result.error.message })
    }
    
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if ( movieIndex === -1 ) {
        return res.status(404).json({ message: "Movie not found" })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }
    
    movies[movieIndex] = updateMovie

    // const findMovie = movies.find( movie => movie.id === id )
    // if ( !findMovie ) {
    //     return res.status(404).json({ message: "Movie not found" })
    // }
    // const updateMovie = {
    //     ...findMovie,
    //     ...result.data
    // }
    // Object.assign( findMovie , result.data ) // Update the orignial file with the new data
    return res.json(updateMovie)
})

app.delete('/movies/:id' , (req, res) => {

    const { id } = req.params
    const movieIndex = movies.findIndex( movie => movie.id === id )

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return res.status(200).json( {message: 'Movie deleted'} )
})

app.options('/movies/:id', (req, res) => {

    // This is for CORS, because delete is a complex methos needs this options method
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    res.send(200)
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})