const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid'),
    bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');
require('dotenv').config({ path: '.env' });
const { check, validationResult } = require('express-validator');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database locally
/** 
 mongoose.connect('mongodb://localhost:27017/[myflixdb]', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
*/

// Connect to database remotely
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Connection error:", error);
});


app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');



const Movies = Models.Movie;
const Users = Models.User;
const Directors = Models.Director;
const Genres = Models.Genre;

// create a write stream and append to log.txt file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'}) 

app.use(morgan('combined', {stream: accessLogStream}));

app.use(express.static('public'));

/** 
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
          birthDate: '1970-02-03'
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
            birthDate: '1982-06-28'
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
            birthDate: '1963-10-23',
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
            birthDate: '1969-03-28',
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
            birthDate: '1970-07-30'
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
            birthDate: '1941-01-05',
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
            birthDate: '1973-02-09',
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
            birthDate: '1970-07-30'
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
            birthDate: '1950-07-01',
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
            birthDate: '1965-07-01',
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
            birthDate: '1973-02-09',
        },
    }
];
*/

/**
let users = [
    {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: '123456',
        birthDate: '1990-05-15',
        favmovies: [ 'Inception' ]
    },
    {
        username: 'sarahsmith',
        email: 'sarah.smith@email.com',
        password: 'pass123',
        birthDate: '1988-10-20',
        favmovies: [ 'Spirited Away' ]
    },
];
*/

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

app.get('/movies',  async (req, res) => { // Gets the list of movies
    await Movies.find()
    .then((movies) => {
        res.status(201).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/**
paths:
  /movies/{title}:
    get:
      summary: Get data about a specific movie
      description: Returns information about a movie based on its title.
 */

 app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => { // Gets the data about a certain movie
    await Movies.findOne({ title: req.params.title})
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        })
});

/**
paths:
   /genres:
     get:
       summary: Retrieve a list of genres
       description: Returns a JSON array containing information about genres.
 */

app.get('/genres', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Genres.find()
    .then((genre) => {
        res.status(201).json(genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/**
paths:
  /genres/{name}:
    get:
      summary: Get data about a specific genre
      description: Returns information about a genre based on its name.
 */

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Genres.findOne({ name: req.params.name})
        .then((genre) => {
            res.status(201).json(genre);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/**
paths:
   /directors:
     get:
       summary: Retrieve a list of directors
       description: Returns a JSON array containing information about directors.
 */

app.get('/directors', passport.authenticate('jwt', { session: false }), async (req,res) => {
    await Directors.find()
    .then ((director) => {
        res.status(201).json(director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    });
});

/**
paths:
  /movies/{title}/director:
    get:
      summary: Get data about a specific director 
      description: Returns information about director by its name.
 */

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => { // Gets director 
    await Directors.findOne({ name: req.params.name })
    .then((directors) => {
        res.json(directors);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
    })
});

/**
paths:
   /directors:
     get:
       summary: Retrieve a list of users
       description: Returns a JSON array containing information about users.
 */

app.get('/users',  passport.authenticate('jwt', { session: false }), async (req, res) => { // Gets all users
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

/**
paths:
  /movies/{title}/director:
    get:
      summary: Get data about a specific user
      description: Returns information about user by its username.
 */

app.get('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {  
    await Users.findOne({ Username: req.params.username })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// POST requests

/**
paths:
  /users:
    post:
      summary: Create a new user
      description: Adds a new user to the system.
 */
app.post('/users', 
    [
        check('Username', 'Username is required.').not().isEmpty(),
        check('Username', 'Username must contain at least 5 characters.').isLength({min: 5}),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail()
    ], 
        async (req, res) => {
            // check the validation object for errors
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }   
            
            let hashedPassword = Users.hashPassword(req.body.Password);
            await Users.findOne({ Username: req.body.Username })
                .then((user) => {
                    if (user) {
                    return res.status(400).send(req.body.Username + ' already exists');
                    } else {
                    Users
                        .create({
                            Username: req.body.Username,
                            Password: hashedPassword,
                            Email: req.body.Email,
                            birthDate: req.body.birthDate
                        })
                        .then((user) => {
                            res.status(201).json(user) 
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send('Error: ' + error);
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).send('Error: ' + error);
                });
});

/**paths:
  /users/{username}:
    put:
      summary: Update username
      description: Updates the username of a user.
 */
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.Username !== req.params.username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS 
    
    await Users.findOneAndUpdate({ Username: req.params.username}, 
        { $set: {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            birthDate: req.body.birthDate
          }
        },
        { new: true }) // This line makes sure that the updated document is returned
        .then((updatedUser) => {
            res.status(200).json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// DELETE requests

/**
paths:
  /users/{username}:
    delete:
      summary: Delete a user by username
      description: Deletes a user from the system.
 */

app.delete("/users/:username", passport.authenticate('jwt', { session: false }), async(req, res) => {
    await Users.findOneAndDelete({ Username: req.params.username })
        .then((user) => {
            if (!user) {
              res.status(400).send(req.params.username + " was not found");
            } else {
              res.status(200).send(req.params.username + " was deleted.");
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error: " + err);
        });
});

/**
paths:
  /users/{username}/favmovies/{MovieID}:
    post:
      summary: Add a movie to a user's favorite movie list
      description: Adds a movie to the favorite movie list of a user.
 */
app.post('/users/:username/favmovies/:MovieID', passport.authenticate('jwt', { session: false }), async (req, res) => { // Add a movie to user's favorite movie list
    await Users.findOneAndUpdate({ Username: req.params.username}, {
        $push: { favmovies: req.params.MovieID }},
        { new: true })
        .then((updatedUser) => {
            res.status(200).json(updatedUser)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

/**
paths:
  /users/{username}/{MovieID}:
    delete:
      summary: Remove a movie from user's favorite list
      description: Removes a movie from the favorite list of a user.
 */
app.delete('/users/:username/:MovieID', passport.authenticate('jwt', { session: false }), async  (req, res) => { //
    await Users.findOneAndUpdate({ Username: req.params.username }, {
        $pull: { favmovies: req.params.MovieID}},
        { new: true })
        .then((updatedUser) => {
            res.status(200).json(updatedUser)
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});
      
// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});




