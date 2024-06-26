const express = require('express');
const dittoJSON = require('./pokemon/ditto.json');

const app = express();
const PORT = process.env.PORT ?? 1234;

// Middleware for parsing JSON bodies
app.use(express.json());

// Route to get Ditto data
app.get('/pokemon/ditto', (req, res) => {
    res.json(dittoJSON);
});

// Route to handle other Pokemon data
app.post('/pokemon', (req, res) => {
    const data = req.body;
    // Here, you would typically call a database to save the info

    res.status(201).json(data); // Return the received data for demonstration
});

// Global error handling for 404 not found
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Global error handler for other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
