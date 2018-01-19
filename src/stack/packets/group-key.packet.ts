import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';

export class GroupKeyPacket extends GenericPacket {
	group_id : any;

	permission_uid : any;

	enc_symm_key : any;
	symm_key : any;

	constructor(params : any = {})
	{
		super();

		this.packet_header.type = PacketType.GROUP_KEY;
	}
}
