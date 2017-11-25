import { ProtocolPacket } from '../core/protocol-packet';
import { PacketType } from './packet.enum';

export class GenericPacket extends ProtocolPacket {

	packet_type : PacketType = PacketType.NONE;
	creator_uid : any;
	packet_sign : any;
	unchanged_msg : any;

	constructor()
	{
		super();

		this.packet_type = PacketType.NONE;
	}
}
