const express = require('express');
const app = express();

let topMovies = [
    {
        title: 'Avengers: Endgame',
        director: 'Anthony Russo, Joe Russo'
    },
    {
        title: 'Spider-Man: No Way Home',
        director: 'Jon Watts'
    },
    {
        title: 'Ip Man 2',
        director: 'Wilson Yip'
    },
    {
        title: 'Rush Hour',
        director: 'Brett Ratner'
    },
    {
        title: 'Interstellar',
        director: 'Christopher Nolam'
    },
    {
        title: 'Spirited Away',
        director: 'Hayao Miyazaki'
    },
    {
        title: 'Your Name',
        director: 'Makoto Shinkai'
    },
    {
        title: 'Inception',
        director: 'Christoper Nolan'
    },
    {
        title: 'Fearless',
        director: 'Ronny Yu'
    },
    {
        title: 'The Karate Kid',
        director: 'Harald Zwart'
    },
];
// Express static function
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});