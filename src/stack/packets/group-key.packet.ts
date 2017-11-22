import { GenericPacket } from './generic.packet';

export class GroupKeyPacket extends GenericPacket {
	group_id : any;

	permission_uid : any;

	enc_symm_key : any;
	symm_key : any;
}
