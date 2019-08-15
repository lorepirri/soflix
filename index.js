const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

const app = express();

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

// connect to mongodb
// https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate
mongoose.connect('mongodb://localhost:27017/SoFlixDB', {useNewUrlParser: true, useFindAndModify: false });
const db = mongoose.connection;
//Bind error messages to console.error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use morgan logger middleware
app.use(morgan('common'));

// routes all requests for static files to 'public' folder
app.use(express.static('public'));

app.use(bodyParser.json());


// Routes //

// Add index routes to middleware chain.
app.use('/', indexRouter);
// Add users routes to middleware chain.
app.use('/users', usersRouter);
// Add movies routes to middleware chain.
app.use('/movies', moviesRouter);


// -- Genres --

// // Get the data about a single Genre, by name
// app.get('/genres/:name', (req, res) => {
//   res.json(Genres.find( (genre) => { return genre.name === req.params.name; }));
// });

// // -- Directors --

// // Get the data about a single Director, by name
// app.get('/directors/:name', (req, res) => {
//   res.json(Directors.find( (director) => { return director.name === req.params.name; }));
// });




app.use((err, req, res) => {
  var logEntryTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  var logEntry = `${logEntryTimestamp} - Error: ${err.stack}`;
  console.error(logEntry);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Soflix is listening on port 8080');
});
