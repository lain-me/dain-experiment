import { Serializer } from '../serializer/serializer';

import { PacketDirection } from './packet-direction.enum';
import { PacketType } from './packet-type.enum';

export class PacketTypeHeader implements Serializer {

	public direction : PacketDirection = PacketDirection.NONE;
	public type : PacketType = PacketType.NONE;

	serialize()
	{
		return {direction : this.direction, type : this.type};
	}

	deserialize(object)
	{
	}
}
