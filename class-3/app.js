const express = require('express')
const movies = require('./movies.json')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234


// ENDPOINT For a request with that URL we'll return the entire json file with all the movies
// app.get('/movies' , (req, res) => {

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

    const { genre, director, title } = req.query // Using query, express will detect if there is any query (query -> genre=something)
    if(genre) { // If there is a query with that name we proceed
        
        const filteredByGenre = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()) // => we use some instead of includes because of case sensitive
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



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})