const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

let Users = [
  {id: '0', name: 'Lorenzo', username: 'lorepirri', password: '', email: '', birthday: '', favorites: ['3']}
];

let Directors = [ 
  {name: 'Christopher Nolan', bio: '', birthyear: '', deathyear: ''},
  {name: 'Steven Spielberg', bio: '', birthyear: '', deathyear: ''},
  {name: 'Ridley Scott', bio: '', birthyear: '', deathyear: ''},
  {name: 'Alex Proyas', bio: '', birthyear: '', deathyear: ''},
  {name: 'Mel Brooks', bio: '', birthyear: '', deathyear: ''},
  {name: 'Stanley Kubrick', bio: '', birthyear: '', deathyear: ''},
  {name: 'Andrew Niccol', bio: '', birthyear: '', deathyear: ''},
];

let Genres = [ 
  { name: 'SciFi', description: 'Science fiction (often abbreviated Sci-Fi or SF) is a genre of speculative fiction that has been called the "literature of ideas". It typically deals with imaginative and futuristic concepts such as advanced science and technology, time travel, parallel universes, fictional worlds, space exploration, and extraterrestrial life. Science fiction often explores the potential consequences of scientific innovations.'},
  { name: 'Crime', description: 'Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.'},
  { name: 'Drama', description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone'}
];

let Movies = [ 
  {
    id: '0',
    title : 'Inception',
    year : '2010',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: 'SciFi',
    director: 'Christopher Nolan',
    imageURL: '',
    featured: 'false'
  },
  {
    id: '1',
    title : 'Minority Report',
    year : '2002',
    description: 'In a future where a special police unit is able to arrest murderers before they commit their crimes, an officer from that unit is himself accused of a future murder.',
    genre: 'Crime',
    director: 'Steven Spielberg',
    imageURL: 'https://m.media-amazon.com/images/M/MV5BZTI3YzZjZjEtMDdjOC00OWVjLTk0YmYtYzI2MGMwZjFiMzBlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX140_CR0,0,140,209_AL_.jpg',
    featured: 'false'
  },
  {
    id: '2',
    title : 'Interstellar',
    year : '2014',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    genre: 'Drama',
    director: 'Christopher Nolan',
    imageURL: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY209_CR0,0,140,209_AL_.jpg',
    featured: 'false'
  },
  {
    id: '3',
    title : 'Donnie Darko',
    year : '2001',
    description: 'A troubled teenager is plagued by visions of a man in a large rabbit suit who manipulates him to commit a series of crimes, after he narrowly escapes a bizarre accident.',
    genre: 'Drama',
    director: 'Christopher Nolan',
    imageURL: 'https://m.media-amazon.com/images/M/MV5BZjZlZDlkYTktMmU1My00ZDBiLWFlNjEtYTBhNjVhOTM4ZjJjXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX140_CR0,0,140,209_AL_.jpg',
    featured: 'false'
  },
  {
    id: '4',
    title : 'The Martian',
    year : '2015',
    description: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
    genre: 'Drama',
    director: 'Ridley Scott',
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_UY209_CR0,0,140,209_AL_.jpg',
    featured: 'false'
  },
  {
    id: '5',
    title : 'Dark City',
    year : '1998',
    description: '',
    genre: 'SciFi',
    director: 'Alex Proyas',
    imageURL: '',
    featured: 'false'
  },
  {
    id: '6',
    title : 'Spaceballs',
    year : '1987',
    description: '',
    genre: '',
    director: 'Mel Brooks',
    imageURL: '',
    featured: 'false'
  },
  {
    id: '7',
    title : '2001: A Space Odyssey',
    year : '1968',
    description: '',
    genre: 'SciFi',
    director: 'Stanley Kubrick',
    imageURL: '',
    featured: 'false'
  },
  {
    id: '8',
    title : 'Gattaca',
    year : '1997',
    description: '',
    genre: 'SciFi',
    director: 'Andrew Niccol',
    imageURL: '',
    featured: 'false'
  },
  {
    id: '9',
    title : 'Blade Runner',
    year : '1982',
    description: '',
    genre: 'SciFi',
    director: 'Ridley Scott',
    imageURL: '',
    featured: 'false'
  }
];

// use morgan logger middleware
app.use(morgan('common'));

// routes all requests for static files to 'public' folder
app.use(express.static('public'));

app.use(bodyParser.json());

// GET requests
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

// -- Movies --

// Get the list of data about all Movies
app.get('/movies', (req, res) => {
  res.json(Movies);
});

// Get the data about a single Movie, by title
app.get('/movies/:title', (req, res) => {
  res.json(Movies.find( (movie) => { return movie.title.toLowerCase().includes(req.params.title.toLowerCase()); }));
});

// -- Genres --

// Get the data about a single Genre, by name
app.get('/genres/:name', (req, res) => {
  res.json(Genres.find( (genre) => { return genre.name === req.params.name; }));
});

// -- Directors --

// Get the data about a single Director, by name
app.get('/directors/:name', (req, res) => {
  res.json(Directors.find( (director) => { return director.name === req.params.name; }));
});

// -- Users --

// Get the list of data about all Movies
app.get('/users', (req, res) => {
  res.json(Users);
});

// Adds data for a new user to the list of Users.
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Deletes a user from the list by ID
app.delete('/users/:id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });

  if (user) {
    Users = Users.filter(function(obj) { return obj.id !== req.params.id; });
    res.status(201).send('User ' + user.name + ' with id ' + req.params.id + ' was deleted.')
  }
});

// Get a user from the list by ID
app.get('/users/:id', (req, res) => {
  res.json(Users.find( (user) => { return user.id === req.params.id; }));
});

// Update the info of a user by id
app.put('/users/:id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });
  let newUserInfo = req.body;

  if (user && newUserInfo) {
    // preserve the user id
    newUserInfo.id = user.id;
    // preserve the user favorites
    newUserInfo.favorites = user.favorites;    
    // merge old info and new info (TODO: validate new info)
    Object.assign(user, newUserInfo);
    // merge user with update info into the list of Users
    Users = Users.map((user) => (user.id === newUserInfo.id) ? newUserInfo : user);
    res.status(201).send(user);
  } else if (!newUserInfo.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  } 
});

// -- List of Favorites --

// add a favorite Movie to a User.
app.post('/users/:id/:movie_id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });
  let movie = Movies.find((movie) => { return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
    res.status(201).send(user);
  } else if (!movie) {
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});

// remove a favorite Movie from a User.
app.delete('/users/:id/:movie_id', (req, res) => {
  let user = Users.find((user) => { return user.id === req.params.id; });
  let movie = Movies.find((movie) => { return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = user.favorites.filter((movie_id) => { return movie_id !== req.params.movie_id; });
    res.status(201).send(user);
  } else if (!movie) {
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});

app.use((err, req, res, next) => {
  var logEntryTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  var logEntry = `${logEntryTimestamp} - Error: ${err.stack}`;
  console.error(logEntry);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Soflix is listening on port 8080');
});
