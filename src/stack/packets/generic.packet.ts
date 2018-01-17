import { ProtocolPacket } from '../core/protocol-packet';

import { PacketHeader } from './packet-header.class';

import { JsonSerializer } from '../serializer/json-serializer.interface';

export class GenericPacket extends ProtocolPacket implements JsonSerializer {

	packet_header : PacketHeader = new PacketHeader();
	creator_uid : any;
	packet_sign : any;
	unchanged_msg : any;

	constructor()
	{
		super();
	}

	serialize() : object
	{
		return {};
	}

	deserialize(o : any)
	{
	}
}
