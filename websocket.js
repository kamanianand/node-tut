const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app); // HTTP server
const wss = new WebSocket.Server({ server }); // WebSocket server

app.use(bodyParser.json());

// Store clients
const clients = new Set();

// WebSocket connection
wss.on('connection', (ws) => {
  console.log('🔌 New WebSocket connection');
  clients.add(ws);

  ws.on('message', (msg) => {
    console.log('📩 Message from client:', msg.toString());
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('❌ Client disconnected');
  });

  // Send welcome
  ws.send('👋 Connected to WebSocket server!');
});

// REST API endpoint to broadcast message to WebSocket clients
app.post('/broadcast', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(`📢 Broadcast: ${message}`);
    }
  });

  res.json({ status: 'Message sent to all WebSocket clients' });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running:
  - WebSocket: ws://localhost:${PORT}
  - REST API:  http://localhost:${PORT}/broadcast`);
});
