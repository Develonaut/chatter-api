var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + 'index.html')
});

io.on('connection', function(client) {
  console.log('client connected!');
  client.send('You proxied to the heroku server!');

  client.on('join', function(data) {
    console.log(data);
  });
});

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});