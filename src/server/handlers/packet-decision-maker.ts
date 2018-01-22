import * as net from 'net';

import { DataPacket, GenericPacket, GroupKeyPacket, PacketType, PublicKeyPacket } from '../../stack/packets';
import { GroupKeyPacketHandler } from './group-key-packet.handler';
import { DataPacketHandler } from './data-packet.handler';
import { PublicKeyPacketHandler } from './public-key-packet.handler';

export class PacketDecisionMaker {
	static handle(uid : number, packet : GenericPacket, socket : net.Socket)
	{
		switch (packet.packet_header.type) {
			case PacketType.GROUP_KEY:
				GroupKeyPacketHandler.handle(uid, <GroupKeyPacket>packet, socket);
				break;
			case PacketType.DATA:
				DataPacketHandler.handle(uid, <DataPacket>packet, socket);
				break;
			case PacketType.PUB_KEY:
				PublicKeyPacketHandler.handle(uid, <PublicKeyPacket>packet, socket);
				break;
			default:
				break;
		}
	}
}
