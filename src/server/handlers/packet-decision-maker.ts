import { DataPacket, GroupKeyPacket, PacketType, PublicKeyPacket } from '../../stack/packets';

import { HandlerParams } from './handler-params.interface';
import { GroupKeyPacketHandler } from './group-key-packet.handler';
import { DataPacketHandler } from './data-packet.handler';
import { PublicKeyPacketHandler } from './public-key-packet.handler';

export class PacketDecisionMaker {
	static handle(params : HandlerParams = null)
	{
		switch (params.packet.packet_header.type) {
			case PacketType.GROUP_KEY:
				GroupKeyPacketHandler.handle(<GroupKeyPacket>params.packet, params);
				break;
			case PacketType.DATA:
				DataPacketHandler.handle(<DataPacket>params.packet, params);
				break;
			case PacketType.PUB_KEY:
				PublicKeyPacketHandler.handle(<PublicKeyPacket>params.packet, params);
				break;
			default:
				break;
		}
	}
}
