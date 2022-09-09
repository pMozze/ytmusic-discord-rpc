import { WebSocket } from 'ws';

import * as DiscordRPC from 'discord-rpc';
import IMetaData from '../models/IMetaData';

const discord = {
	client: null,
	clientId: '962400209533546566',
	isAuthorized: false
};

const onClientConnected = async (webSocketClient: WebSocket) => {
	discord.client = new DiscordRPC.Client({ transport: 'ipc' });
	discord.client.login({ clientId: discord.clientId }).then(() => {
		discord.isAuthorized = true;
	}).catch((error: any) => {
		console.error('An error accured when trying discord login.', error);
		webSocketClient.close();
	});
};

const onDataRecieved = (metadata: IMetaData) => {
	if (!discord.isAuthorized) {
		return;
	}

	discord.client.setActivity({
		state: metadata.artist,
		details: metadata.title,
		largeImageKey: metadata.artwork,
		buttons: [{
			label: 'Я люблю Златочку ❤️',
			url: 'https://music.youtube.com/'
		}]
	}).catch((error: any) => {
		console.error('An error accured when trying set discord activity.', error);
	});
};

const onClientDisconnected = async () => {
	discord.isAuthorized = false;
	await discord.client.clearActivity();
	await discord.client.destroy();
};

export {
	onClientConnected,
	onDataRecieved,
	onClientDisconnected
};