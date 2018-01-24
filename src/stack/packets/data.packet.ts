import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';
import { JsonSerializer } from '../serializer/json-serializer.interface';

export class DataPacket extends GenericPacket implements JsonSerializer {
	data_id : any;
	group_id : any;
	enc_data : any;

	constructor(params : any = {})
	{
		super();
		this.packet_header.type = PacketType.DATA;
	}

	fromObject(o : any = {})
	{
		super.fromObject(o);

		if (o.data_id) this.data_id = o.data_id;
		if (o.group_id) this.group_id = o.group_id;
		if (o.enc_data) this.enc_data = o.enc_data;
	}

	toObject() : any
	{
		return {
			...super.toObject(),
			data_id  : this.data_id,
			group_id : this.group_id,
			enc_data : this.enc_data
		};
	}

	deserialize(json : string)
	{
		try {
			let o = JSON.parse(json);
			this.fromObject(o);

		} catch (e) {
		}
	}

	serialize() : string
	{
		return JSON.stringify(this.toObject());
	}
}
