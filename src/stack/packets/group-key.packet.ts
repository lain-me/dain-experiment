import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';
import { JsonSerializer } from '../serializer/json-serializer.interface';

export class GroupKeyPacket extends GenericPacket implements JsonSerializer {
	group_id : any;

	permission_uid : any;

	enc_symm_key : any;
	symm_key : any;

	constructor(params : any = {})
	{
		super();

		this.fromObject({...params, type : PacketType.GROUP_KEY});
	}

	fromObject(o : any = {})
	{
		super.fromObject(o);

		if (o.enc_symm_key) this.enc_symm_key = o.enc_symm_key;
	}

	toObject() : any
	{
		return {
			...super.toObject(),
			enc_symm_key : this.enc_symm_key
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
