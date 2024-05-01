const express = require('express');
      
      morgan = require('morgan');
      fs = require('fs'), // import built in node modules fs and path 
      path = require('path'); // import built in node modules path
      
      bodyParser = require('body-parser'),
      uuid = require('uuid');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'}) // create a write stream and append to log.txt file

let movies = [
    {
        title: 'Avengers: Endgame', 
        description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {
          name: 'Anthony Russo', 
          bio: 'Collectively known as the Russo brothers are American directors, producers, and screenwriters.',
          birth_year: '1970-02-03'
        },
    },
    {
        title: 'Spider-Man: No Way Home',
        description: 'When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {
            name: 'Jon Watts',
            bio: 'An American film director, producer and screenwriter.',
            birth_year: '1982-06-28'
        },
    },
    {
        title: 'Ip Man 2',
        description: 'This film inspired by a true story, Wing Chun martial arts master Ip Man (Donnie Yen) and his family are moving from Foshan, China, to Hong Kong, where Ip aspires to create a school so that he may teach his fighting techniques to a new generation. However, he finds resistance from an asthmatic Hung Ga master named Hong Zhen Nan (Sammo Hung). Soon, Ip is drawn into a treacherous world of corruption as well as a fateful showdown with a merciless boxer known as the Twister (Darren Shahlavi).',
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {  
            name: 'Wilson Yip',
            bio: 'A Hong Kong actor, filmmaker and screenwriter.',
            birth_year: '1963-10-23',
        },
    },
    {
        title: 'Rush Hour',
        description: "A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consul's kidnapped daughter, while trying to arrest a dangerous crime lord along the way.",
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {
            name: 'Brett Ratner',
            bio: 'An American film director and producer.',
            birth_year: '1969-03-28',
        },  
    },
    {
        title: 'Interstellar',
        description: 'Set in a dystopian future where humanity is embroiled in a catastrophic blight and famine, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humankind.',
        genre: {
            name: 'Sci-Fi',
            description: 'A film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'
        },
        director: {
            name: 'Christopher Nolan',
            bio: "Christopher Nolan is an Academy Award-winning movie director and screenwriter who's helmed several hit films, including Inception, The Dark Knight, Interstellar, and Oppenheimer.",
            birth_year: '1970-07-30'
        },
        
    },
    {
        title: 'Spirited Away',
        description: "Chihiro's family is moving to a new house, but when they stop on the way to explore an abandoned village, her parents undergo a mysterious transformation and Chihiro is whisked into a world of fantastic spirits ruled over by the sorceress Yubaba.",
        genre: {
            name: 'Fantasy',
            description: 'A genre of speculative fiction involving magical elements, typically set in a fantasy world and usually inspired by mythology or folklore.'
        },
        director: {
            name: 'Hayao Miyazaki',
            bio: 'A Japanese animator, filmmaker, and manga artist.',
            birth_year: '1941-01-05',
        },
        
    },
    {
        title: 'Your Name',
        description: 'A teenage boy and girl embark on a quest to meet each other for the first time after they magically swap bodies.',
        genre: {
            name: 'Romance',
            description: 'A genre fiction novel that primary focuses on the relationship and romantic love between two people, typically with an emotionally satisfying and optimistic ending.'
        },
        director: {
            name: 'Makoto Shinkai',
            bio: 'A Japanese filmmaker and novelist.',
            birth_year: '1973-02-09',
        },
        
    },
    {
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
        genre: {
            name: 'Sci-Fi',
            description: 'A film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science.'
        },
        director: {
            name: 'Christoper Nolan',
            bio: "Christopher Nolan is an Academy Award-winning movie director and screenwriter who's helmed several hit films, including Inception, The Dark Knight, Interstellar, and Oppenheimer.",
            birth_year: '1970-07-30'
        },
    },
    {
        title: 'Fearless',
        description: "After a terrible tragedy, a martial artist (Jet Li) retreats to a remote village to gain a new appreciation for the important things in life, but when he returns to the city to reconcile his past with the present, he gets caught up in a duel to the death defending China's honor.",
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {
            name: 'Ronny Yu',
            bio: 'A Hong Kong film director, producer, and movie writer.',
            birth_year: '1950-07-01',
        },
        
    },
    {
        title: 'The Karate Kid',
        description: "When his mother's career results in a move to China, 12-year-old Dre Parker (Jaden Smith) finds that he is a stranger in a strange land. Though he knows a little karate, his fighting skills are no match for Cheng, the school bully. Dre finds a friend in Mr. Han (Jackie Chan), a maintenance man who is also a martial-arts master. Mr. Han teaches Dre all about kung fu in the hope that Dre will be able to face down Cheng and perhaps win the heart of a pretty classmate named Mei Ying.",
        genre: {
            name: 'Action',
            description: 'A form of genre fiction whose subject matter is characterized by emphasis on exciting action sequences.'
        },
        director: {
            name: 'Harald Zwart',
            bio: 'A Dutch-Norwegian film director.',
            birth_year: '1965-07-01',
        },
        
    },
    {
        title: 'Suzume',
        description: 'The film follows 17-year-old high school girl Suzume Iwato and young stranger Souta Munakata, who team up to prevent a series of disasters across Japan by sealing doors from the colossal, supernatural worm that causes earthquakes after being released.',
        genre: {
            name: 'Fantasy',
            description: 'A genre of speculative fiction involving magical elements, typically set in a fantasy world and usually inspired by mythology or folklore.'
        },
        director: {
            name: 'Makoto Shinkai',
            bio: 'A Japanese filmmaker and novelist.',
            birth_year: '1973-02-09',
        },
    }
];

let users = [
    {
        id: '1',
        name: 'John Doe',
        favMovies: []
    },
    {
        id: '2',
        name: 'Anne Doe',
        favMovies: ['Inception']
    },
];

// Express static function

app.use(express.static('public'));

// Middleware

app.use(morgan('common'));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());

// GET requests

app.get('/', (req, res) => {
    res.send('Welcome to my app!');
});
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

/**
paths:
   /movies:
     get:
       summary: Retrieve a list of movies
       description: Returns a JSON array containing information about movies.
 */
app.get('/movies', (req, res) => { // Gets the list of movies
    res.json(movies);
});

/**
paths:
  /movies/{title}:
    get:
      summary: Get data about a specific movie
      description: Returns information about a movie based on its title.
 */

 // READ title
app.get('/movies/:title', (req, res) => { // Gets the data about a certain movie
    const { title } = req.params;
    res.json(movies.find((movie) => { 
        return movie.title === req.params.title }));

    if(movie){
        res.status(200).json(movie);
    }
    else{
        res.status(404).send('Movie not found');
    }
});

/**
paths:
  /movies/{title}/genre:
    get:
      summary: Get genre by movie title
      description: Retrieves the genre of a movie based on its title.
 */
app.get('/movies/:title/genre', (req, res) => { // Gets genre by title
    let movie = movies.find((movie) => {
        return movie.title === req.params.title });

    if(movie){
        res.status(200).json(movie.genre);
    }
    else{
        res.status(404).send('Movie not found');
    }
});


/**
paths:
  /movies/{title}/director:
    get:
      summary: Get director by movie title
      description: Retrieves the director of a movie based on its title.
 */
app.get('/movies/:title/director', (req, res) => { // Gets director by title
    let movie = movies.find((movie) => {
        return movie.title === req.params.title });

    if(movie){
        res.status(200).json(movie.director);
    }
    else{
        res.status(404).send('Movie not found :( ');
    }
});

app.get('/users', (req, res) => {  // Gets the list of users
    res.json(users);
});

// POST requests

/**
paths:
  /users:
    post:
      summary: Create a new user
      description: Adds a new user to the system.
 */
app.post('/users', (req, res) => { // CREATE user
    const newUser = req.body;
    
    if (newUser.name) {
      newUser.id = uuid.v4();
      users.push(newUser);
      res.status(201).send(newUser);
    }
    else {
      res.status(400).send('Name is missing.');
    }
});

/**
paths:
  /users/{id}/{movieTitle}:
    post:
      summary: Add a movie to a user's favorite movie list
      description: Adds a movie to the favorite movie list of a user.
 */
app.post('/users/:id/:movieTitle', (req, res) => { // Add a movie to user's favorite movie list
    const { id, movieTitle } = req.params;
    
    let user = users.find((user) => {
        return user.id === req.params.id });
    
    
    if(user){
        user.favMovies.push(movieTitle);
        res.status(200).send('Added favorite movie.');
    }
    else{
        res.status(400).send('Could not update favorite movies.');
    }    
});

// PUT requests

/**paths:
  /users/{id}:
    put:
      summary: Update user's name
      description: Updates the name of a user.
 */
app.put('/users/:id', (req, res) => { // UPDATE user 
    const { title } = req.params;
    const updatedUser = req.body;
    
    let user = users.find((user) => {
        return user.id === req.params.id });
    
    if(user) {
        user.name = updatedUser.name,
        res.status(200).json(user);  
    }
    else {
        res.status(400).send('User is not registered.');
    }
});

// DELETE requests

/**
paths:
  /users/{id}:
    delete:
      summary: Delete a user
      description: Deletes a user from the system.
 */
app.delete('/users/:id', (req, res) => { // DELETE user
    let user = users.find((user) => {
        return user.id === req.params.id });
        
    if(user) {
        users = users.filter((user) => {
            return user.id === req.params.id});
            res.status(201).send('User has been deleted,');
    }
    else {
        res.status(400).send('User cannot be found.');
    }
});

/**
paths:
  /users/{id}/{movieTitle}:
    delete:
      summary: Remove a movie from user's favorite list
      description: Removes a movie from the favorite list of a user.
 */
app.delete('/users/:id/:movieTitle', (req, res) => { //
    const { id, movieTitle } = req.params;
    
    let user = users.find((user) => {
        return user.id === req.params.id });
    
    
    if(user){
        user.favMovies = user.favMovies.filter( title => title !== movieTitle);
        res.status(200).send('Movie has been removed from the list.');
    }
    else{
        res.status(400).send('Could not update favorite movies.');
    }    
  });

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});