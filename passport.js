const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Users = require('./models/users.js'),
  passportJWT = require('passport-jwt');

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

if (!process.env.JWT_SECRET) {
  console.error('Environment variables not found.');
}

// LocalStrategy defines your basic HTTP 
// authentication for login requests.
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + ' ' + password);
  Users.findOne({ Username: username }, (err, user) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    if (!user) {
      console.log('incorrect username');
      return callback(null, false, { message: 'Incorrect username or password.' });
    }
    // the password doesn't get checked here, yet
    return callback(null, user);
  });
}));

// The JWTStrategy allows to authenticate users based on the JWT
// submitted alongside their request.
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then( (user) => {
      return callback(null, user);
    })
    .catch( err => {
      return callback(err);
    });
}));