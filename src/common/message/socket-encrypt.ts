import { SocketMessage } from './socket-message';

export class SocketEncrypt {
	static encrypt(msg : SocketMessage) : string
	{
		return msg.id + ':' + msg.body;
	}
}
