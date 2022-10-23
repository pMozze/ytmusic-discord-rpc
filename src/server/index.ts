import { WebSocketServer } from 'ws';
import { onClientConnected, onClientDisconnected, onDataRecieved } from './event-handlers';

const webSocketServer = new WebSocketServer({ port: 1337 });
console.log(`WebSocket server is started. Port: ${webSocketServer.options.port}`);

webSocketServer.on('connection', webSocketClient => {
  if (webSocketServer.clients.size > 1) {
    webSocketClient.close();
    return;
  }

  console.log('Web extension client has connected');
  onClientConnected(webSocketClient);

  webSocketClient.on('message', data => {
    try {
      const jsonData = JSON.parse(data.toString());
      onDataRecieved(jsonData);
    } catch (error) {
      console.error(error);
    }
  });

  webSocketClient.on('close', () => {
    onClientDisconnected();
    console.log('Web extension client has disconnected');
  });
});

webSocketServer.on('error', error => {
  console.error('WebSocket server is accured error:', error);
});

webSocketServer.on('close', () => {
  console.log('WebSocket server is closed');
});
