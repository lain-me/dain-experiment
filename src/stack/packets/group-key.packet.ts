import { GenericPacket } from './generic.packet';
import { PacketType } from './packet.enum';

export class GroupKeyPacket extends GenericPacket {
	group_id : any;

	permission_uid : any;

	enc_symm_key : any;
	symm_key : any;

	constructor(){
		super();

		this.packet_type = PacketType.GROUP_KEY;
	}
}
