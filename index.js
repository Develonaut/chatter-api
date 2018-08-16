// Pull .env vars
require('dotenv').config()

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const eventsCapsule = require('./eventCapsule.js');

app.use(express.static(path.join(__dirname, '/')));

io.on(eventsCapsule.CONNECTION, onSocketConnection);

function onSocketConnection(socket) {
  setEventHandlers.call(socket);
  emitConnectionMessage.call(socket);
}

function setEventHandlers() {
  const socket = this;
  // Client Requests to join Server
  socket.on(eventsCapsule.JOIN_REQUEST, function(data) {
    console.log(data);
    // Server allows connection and responds.
    socket.broadcast.emit(eventsCapsule.JOIN_RESPONSE, `${data.name} joined chat`);
  });
}

function emitConnectionMessage() {
  const socket = this;
  const onConnectionMessage = (process.env.NODE_ENV === 'development')
  ? `${socket.id} connected to http://localhost:5000`
  : `${socket.id} connected to https://chatter-react-server.herokuapp.com/`;
  socket.emit(eventsCapsule.CONNECTED, {
    eventsCapsule,
    message: onConnectionMessage
  });
}

server.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});