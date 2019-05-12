const express = require('express'),
  morgan = require('morgan');
const app = express();

let topMovies = [ {
  title : 'Inception',
  year : '2010',
  director: 'Christopher Nolan'
},
{
  title : 'Minority Report',
  year : '2002',
  director: 'Steven Spielberg'
},
{
  title : 'Interstellar',
  year : '2014',
  director: 'Christopher Nolan'
},
{
  title : 'Donnie Darko',
  year : '2001',
  director: 'Christopher Nolan'
},
{
  title : 'The Martian',
  year : '2015',
  director: 'Ridley Scott'
},
{
  title : 'Dark City',
  year : '1998',
  director: 'Alex Proyas'
},
{
  title : 'Spaceballs',
  year : '1987',
  director: 'Mel Brooks'
},
{
  title : '2001: A Space Odyssey',
  year : '1968',
  director: 'Stanley Kubrick'
},
{
  title : 'Gattaca',
  year : '1997',
  director: 'Andrew Niccol'
},
{
  title : 'Blade Runner',
  year : '1982',
  director: 'Ridley Scott'
}
];

// use morgan logger middleware
app.use(morgan('common'));

// routes all requests for static files to 'public' folder
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to Soflix!');
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
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
