import { onIntervalTick } from './common';

const webSocket = new WebSocket('ws://127.0.0.1:1337');

const interval = {
	handle: null,
	time: 1000
};

webSocket.addEventListener('open', () => {
	console.log('[YT Music Discord RPC]', 'Connected to socket server');
	interval.handle = setInterval(onIntervalTick, interval.time, webSocket);
});

webSocket.addEventListener('close', () => {
	clearInterval(interval.handle);
	console.log('[YT Music Discord RPC]', 'Disconnected from socket server');
});