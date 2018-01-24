import { DataPacket, GenericPacket, GroupKeyPacket, PacketType, PublicKeyPacket } from '../../stack/packets';

import { MongoProxy } from '../mongo-proxy';
import { HandlerParams } from './handler-params.interface';
import { GroupKeyPacketHandler } from './group-key-packet.handler';
import { DataPacketHandler } from './data-packet.handler';
import { PublicKeyPacketHandler } from './public-key-packet.handler';
import { Observable } from 'rxjs/Observable';

export class PacketDecisionMaker {
	publicKeyHandler : PublicKeyPacketHandler = null;
	groupKeyHandler : GroupKeyPacketHandler = null;
	dataHandler : DataPacketHandler = null;

	constructor(private mongo : MongoProxy)
	{
		this.publicKeyHandler = new PublicKeyPacketHandler(mongo);
		this.groupKeyHandler = new GroupKeyPacketHandler(mongo);
		this.dataHandler = new DataPacketHandler(mongo);
	}

	handle(packet : GenericPacket = null) : Observable<GenericPacket>
	{
		switch (packet.packet_header.type) {
			case PacketType.GROUP_KEY:
				return this.groupKeyHandler.handle(<GroupKeyPacket>packet);
			case PacketType.DATA:
				return this.dataHandler.handle(<DataPacket>packet);
			case PacketType.PUB_KEY:
				return this.publicKeyHandler.handle(<PublicKeyPacket>packet);
			default:
				break;
		}
	}
}
