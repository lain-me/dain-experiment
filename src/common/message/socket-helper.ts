import { GenericPacket } from '../../stack/packets';

import { SocketMessage } from './socket-message';
import { SocketEncrypt } from './socket-encrypt';
import { PacketParser } from '../packet-parser';
import { SocketDecrypt } from '../index';

interface PacketMessageId {
	id : number,
	packet : GenericPacket
}

export class SocketHelper {
	static packetToSocketMessage({id, packet} : PacketMessageId) : string
	{
		let message : SocketMessage = {
			id   : id,
			body : packet.serialize()
		};

		return SocketEncrypt.encrypt(message);
	}

	static socketMessageToPacket(data : string) : PacketMessageId
	{
		let message = SocketDecrypt.decrypt(data);
		return {id : message.id, packet : PacketParser.messageToPacket(message.body)};
	}
}
