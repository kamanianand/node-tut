const { Socket } = require('dgram');
const express   = require('express');
const http      = require('http');
const path      = require("path");
const {Server}  = require("socket.io");

const app     = express();
const server  = http.createServer(app); // HTTP server
const io      = new Server(server);

app.use(express.static(path.resolve("./public")));

io.on('connection',(socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.get('/',(req,res) => {
  return res.sendFile("/public/index.html");
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running:
  - WebSocket: ws://localhost:${PORT}
  - REST API:  http://localhost:${PORT}/broadcast`);
});
