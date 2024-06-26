// Validations schema for POST request using zod

const z = require('zod')

const movieSchema = z.object({
    title: z.string({
        required_error: 'A title is required to add a movie'
    }),
    year: z.number().int().min(1850).max(2030),
    director: z.string(),
    duration: z.number().positive(),
    rate: z.number().min(0).max(10).default(5),
    poster: z.string().url(),
    genre: z.array(
        z.enum(['Action', 'Romance', 'Sci-Fi', 'Drama', 'Crime', 'Horror', 'Thriller', 'Comedy']),
        {
            required_error: 'Genre is required to add a movie'
        }
    ),
    views: z.number().positive().optional()
})

function validateMovie ( input ) {
    return movieSchema.safeParse( input ) // safeParse will return an object that will say if there is an error or if there is data
} 

function validatePartialMovie ( input ) {
    return movieSchema.partial().safeParse( input )
}

module.exports = { validateMovie , validatePartialMovie }
