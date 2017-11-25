import { GenericPacket } from './generic.packet';
import { PacketType } from './packet.enum';

export class DataPacket extends GenericPacket {
	data_id : any;
	group_id : any;
	enc_data : any;

	constructor()
	{
		super();
		this.packet_type = PacketType.DATA;
	}
}
