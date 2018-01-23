import { ProtocolPacket } from '../core/protocol-packet';
import { PacketHeader } from './packet-header.class';
import { JsonSerializer } from '../serializer/json-serializer.interface';

export class GenericPacket extends ProtocolPacket implements JsonSerializer {
	serialize() : string
	{
		return null;
	}

	deserialize(_ : string)
	{
	}

	packet_header : PacketHeader = new PacketHeader();
	creator_uid : any;
	packet_sign : any;
	unchanged_msg : any;

	constructor(params : any = null)
	{
		super();

		if (params)
			this.fromObject(params);
	}

	toObject()
	{
		return {
			...this.packet_header.toObject(),
			creator_uid : this.creator_uid,
			packet_sign : this.packet_sign
		};
	}

	fromObject(o : any = {})
	{
		this.packet_header.fromObject(o);

		if (o.creator_uid) this.creator_uid = o.creator_uid;
		if (o.packet_sign) this.packet_sign = o.packet_sign;
	}

}
