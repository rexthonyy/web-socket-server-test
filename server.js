const express = require('express');
const http = require('http');
const { Server } = require('ws');
const clients = require('./lib/clients');

const app = express();
const server = http.Server(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {

  clients.addClientToRoom("default", ws);
  clients.showStat();

  ws.on('message', (msg) => {
  	clients.broadcastToClientsInRoom('default', ws, msg);
  });

  ws.on('close', () => {
  	clients.removeClientFromAllRooms(ws);
  	clients.showStat();
  });
});