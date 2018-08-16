const events = {
  CONNECTION: "connection", // Event set by IO don't change.
  CONNECTED: "socket:connected",
  JOIN_REQUEST: 'socket:join:request',
  JOIN_RESPONSE: 'socket:join:response',
  MESSAGE_SEND: 'socket:message:send',
};

module.exports = events;