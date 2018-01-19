import { DataPacket, GenericPacket, GroupKeyPacket, PacketType, PublicKeyPacket } from '../stack/packets';

export class PacketParser {
	static messageToPacket(message : string) : GenericPacket
	{
		let params : { type? : PacketType, [key : string] : any } = {};
		try {
			params = JSON.parse(message);
		}
		catch (e) {
			return null;
		}

		switch (params.type) {
			case PacketType.PUB_KEY:
				return new PublicKeyPacket(params);
			case PacketType.DATA:
				return new DataPacket(params);
			case PacketType.GROUP_KEY:
				return new GroupKeyPacket(params);
			default:
				return null;
		}
	}

	static packetToMessage(packet : GenericPacket) : string
	{
		return JSON.stringify(packet.toObject());
	}
}
