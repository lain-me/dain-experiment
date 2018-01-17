import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';

export class DataPacket extends GenericPacket {
	data_id : any;
	group_id : any;
	enc_data : any;

	constructor()
	{
		super();
		this.packet_header.type = PacketType.DATA;
	}
}
