import { PacketRole, PublicKeyPacket } from '../../stack/packets';
import { HandlerParams } from './handler-params.interface';

export class PublicKeyPacketHandler {
	static handle(packet : PublicKeyPacket, params : HandlerParams)
	{
		switch (packet.packet_header.role) {
			case PacketRole.PUBLISH:
				break;
			case PacketRole.REQUEST:
				break;
		}
	}
}
