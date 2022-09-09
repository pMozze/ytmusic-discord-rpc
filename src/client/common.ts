import IMetaData from '../models/IMetaData';

const getMediaSessionMetadata = (): IMetaData | null => {
	const metadata = window.navigator.mediaSession.metadata;

	if (metadata === null) {
		return null;
	}

	const result: IMetaData = {
		title: metadata.title,
		artist: metadata.artist,
		artwork: metadata.artwork[0].src
	};

	return result;
};

const onIntervalTick = (webSocket: WebSocket) => {
	const metadata = getMediaSessionMetadata();

	if (metadata !== null) {
		webSocket.send(JSON.stringify(metadata));
	}
};

export {
	onIntervalTick
};