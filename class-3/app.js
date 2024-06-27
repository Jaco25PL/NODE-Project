const express = require('express')

const app = express()
app.disable('x-powered-by')

app.get('/' , (req , res) => {
    
    res.json({ message: 'Hello frind' })

})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})