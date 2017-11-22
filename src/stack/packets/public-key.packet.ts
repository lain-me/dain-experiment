import { GenericPacket } from './generic.packet';

export class PublicKeyPacket extends GenericPacket {
	key_owner_uid : any;
	public_key : any;
	content : any = {};
}
