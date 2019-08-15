const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// Loads the values from the .env file into the application's process.env
require('dotenv').config();

const app = express();

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const genresRouter = require('./routes/genres');
const directorsRouter = require('./routes/directors');

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
// Add genres routes to middleware chain.
app.use('/genres', genresRouter);
// Add directors routes to middleware chain.
app.use('/directors', directorsRouter);

// error handler
app.use(function(err, req, res, next) {
  var logEntryTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  var logEntry = `${logEntryTimestamp} - Error: ${err.stack}`;
  console.error(logEntry);
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('Something broke!');
});

app.listen(8080, () => {
  console.log('Soflix is listening on port 8080');
});
