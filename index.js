const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// Loads the values from the .env file into the application's process.env
require('dotenv').config();

const passport = require('passport');
require('./passport');

var port = process.env.PORT || 3000;

const cors = require('cors');
let allowedOrigins = [`http://localhost:${port}`, ...process.env.ALLOWED_ORIGINS];

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      // If a specific origin is not found on the list of allowed origins.
      let message = `The CORS policy for this application does not allow access from origin: ${origin}`;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

// Import routes
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const genresRouter = require('./routes/genres');
const directorsRouter = require('./routes/directors');

// connect to mongodb
// https://stackoverflow.com/questions/52572852/deprecationwarning-collection-findandmodify-is-deprecated-use-findoneandupdate
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING, {useNewUrlParser: true, useFindAndModify: false });
const db = mongoose.connection;
//Bind error messages to console.error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use morgan logger middleware
app.use(morgan('common'));

// routes all requests for static files to 'public' folder
app.use(express.static('public'));

app.use(bodyParser.json());

// // must be just right after bodyParser.json
// var auth = require('./auth')(app);
// Add index routes to middleware chain.
app.use('/login', authRouter);

// Routes //

// Add index routes to middleware chain.
app.use('/', passport.authenticate('jwt', { session: false }), indexRouter);
// Add users routes to middleware chain.
app.use('/users', passport.authenticate('jwt', { session: false }), usersRouter);
// Add movies routes to middleware chain.
app.use('/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
// Add genres routes to middleware chain.
app.use('/genres', passport.authenticate('jwt', { session: false }), genresRouter);
// Add directors routes to middleware chain.
app.use('/directors', passport.authenticate('jwt', { session: false }), directorsRouter);

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




app.listen(port, '0.0.0.0', function() {
  console.log(`Soflix is listening on port ${port}`);
});
