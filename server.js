const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Compress responses
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use(express.static(path.join(__dirname))); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'game-page.html'));
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'game-pageTwo.html'));
});

app.get('/winner', (req, res) => {
    res.sendFile(path.join(__dirname, 'winner-page.html'));
});

// Error handling
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
}); 