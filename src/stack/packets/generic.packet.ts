import { ProtocolPacket } from '../core/protocol-packet';
import { PacketType } from './packet.enum';
import { Serializer } from '../serializer/serializer';

export class GenericPacket extends ProtocolPacket implements Serializer {

	packet_type : PacketType = PacketType.NONE;
	creator_uid : any;
	packet_sign : any;
	unchanged_msg : any;

	constructor()
	{
		super();

		this.packet_type = PacketType.NONE;
	}

	serialize()
	{
	}

	deserialize()
	{
	}
}
