const http = require('http'),
  fs = require('fs'),
  url = require('url');

http.createServer((request, response) => {
  var addr = request.url,
    q = url.parse(addr, true),
    filePath = 'index.html';
  // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
  var logEntryTimestamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  var logEntry = `${logEntryTimestamp} - new request URL: ${addr}`;
  fs.appendFile('log.txt', `${logEntry}\n`, 'utf8', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log(logEntry);
    }
  });

  if (q.pathname.includes('documentation')) {
    filePath = `${__dirname}/documentation.html`;
  }
  
  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }
    
    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.write(data);
    response.end();
  });

}).listen(8080);

console.log('Soflix Node server is running on Port 8080.');