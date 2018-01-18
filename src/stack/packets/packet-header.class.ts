import { JsonSerializer } from '../serializer/json-serializer.interface';

import { PacketRole } from './packet-role.enum';
import { PacketType } from './packet-type.enum';

export interface PacketHeaderType {
	type : PacketType,
	role : PacketRole
}

export class PacketHeader {

	public _header : PacketHeaderType = {
		role : PacketRole.NONE,
		type : PacketType.NONE
	};

	get header()
	{
		return this._header;
	}

	set type(value : PacketType)
	{
		this.header.type = value;
	}

	get type()
	{
		return this.header.type;
	}

	set role(value : PacketRole)
	{
		this.header.role = value;
	}

	get role()
	{
		return this.header.role;
	}

	toObject() : PacketHeaderType
	{
		return {role : this.header.role, type : this.header.type};
	}

	fromObject(object : PacketHeaderType)
	{
		this.header.role = object.role;
		this.header.type = object.type;
	}

}
