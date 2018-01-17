import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';

export class PublicKeyPacket extends GenericPacket {
	key_owner_uid : any;
	public_key : any;
	content : any = {};

	constructor()
	{
		super();

		this.packet_header.type = PacketType.PUB_KEY;
	}
}
