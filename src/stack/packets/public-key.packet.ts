import { GenericPacket } from './generic.packet';
import { PacketType } from './packet-type.enum';
import { JsonSerializer } from '../serializer/json-serializer.interface';

export class PublicKeyPacket extends GenericPacket implements JsonSerializer {
	key_owner_uid : any;
	public_key : any;
	content : any = {};

	constructor(params : any = {})
	{
		super();

		this.fromObject({...params, type : PacketType.PUB_KEY});
	}

	fromObject(o : any = {})
	{
		super.fromObject(o);

		if (o.public_key) this.public_key = o.public_key;
		if (o.key_owner_uid) this.key_owner_uid = o.key_owner_uid;
	}

	toObject() : any
	{
		return {
			...super.toObject(),
			public_key    : this.public_key,
			key_owner_uid : this.key_owner_uid
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
		let result = super.toObject();

		return JSON.stringify({...result, key_owner_uid : this.key_owner_uid, public_key : this.public_key});
	}
}
