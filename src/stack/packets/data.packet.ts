import { GenericPacket } from './generic.packet';

export class DataPacket extends GenericPacket {
	data_id : any;
	group_id : any;
	enc_data : any;
}
