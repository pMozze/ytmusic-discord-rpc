import { WebSocket } from 'ws';

import * as DiscordRPC from 'discord-rpc';
import IMetaData from '../models/IMetaData';

interface IDiscord {
  client: DiscordRPC.Client;
  clientId: string;
  isAuthorized: boolean;
};

const discord: IDiscord = {
  client: null,
  clientId: '942539762227630162',
  isAuthorized: false
};

const onClientConnected = async (webSocketClient: WebSocket) => {
  discord.client = new DiscordRPC.Client({ transport: 'ipc' });

  try {
    await discord.client.login({ clientId: discord.clientId });
    discord.isAuthorized = true;
  } catch (error) {
    console.error('An error accured when trying discord login.', error);
    webSocketClient.close();
  }
};

const onDataRecieved = async (metadata: IMetaData) => {
  if (!discord.isAuthorized) {
    return;
  }

  try {
    await discord.client.setActivity({
      state: metadata.artist,
      details: metadata.title,
      largeImageKey: metadata.artwork,
      buttons: [{
        label: 'Я люблю Златочку ❤️',
        url: 'https://music.youtube.com/'
      }]
    });
  } catch (error) {
    console.error('An error accured when trying set discord activity.', error);
  }
};

const onClientDisconnected = async () => {
  try {
    discord.isAuthorized = false;
    await discord.client.clearActivity();
    await discord.client.destroy();
  } catch (error) {
    console.error('An error accured when destroying discrod client.', error);
  }
};

export {
  onClientConnected,
  onDataRecieved,
  onClientDisconnected
};
