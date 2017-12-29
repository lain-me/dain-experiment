import { SocketMessage } from './socket-message';

export class SocketDecrypt {
	static decrypt(raw : string) : SocketMessage
	{
		const split = raw.indexOf(':');

		return {
			id   : +raw.substring(0, split),
			body : raw.substring(split + 1)
		};
	}
}
