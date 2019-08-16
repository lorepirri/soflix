if (!process.env.JWT_SECRET) {
  console.error('Environment variables not found.');
}

let jwt = require('jsonwebtoken');
const passport = require('passport');
require('../passport'); // passport file with the strategies

function generateJWTToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    subject: user.Username, // this is the Username that will be encoded in the JWT
    expiresIn: '7d', // token expires in 7 days
    algorithm: 'HS256' // encryption algorithm used to encode/sign the values of the JWT
  });
}

// POST login.
module.exports.auth = function(req, res, next) {

  passport.authenticate('local', { session: false}, (err, user, info) => {

    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, {session: false}, err => {

      if (err) {
        res.send(err);
      }
      let token = generateJWTToken(user.toJSON());
      return res.json({ user, token });
    });
  })(req, res, next);
};