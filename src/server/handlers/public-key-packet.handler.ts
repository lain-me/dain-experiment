import { Subject, Observable } from 'rxjs';

import { MongoProxy } from '../mongo-proxy';
import { GenericPacket, PacketRole, PublicKeyPacket } from '../../stack/packets';

export class PublicKeyPacketHandler {
	constructor(private mongo : MongoProxy)
	{
	}

	handle(packet : PublicKeyPacket) : Observable<GenericPacket>
	{
		let result = new Subject<GenericPacket>();

		switch (packet.packet_header.role) {
			case PacketRole.PUBLISH:
				this.mongo.insertPublicKey(packet).subscribe(res => {

					// Piggybacking packet
					packet.public_key = null;
					packet.packet_header.role = PacketRole.SUCCESS;

					result.next(packet);
					result.complete();

				}, error => {
					packet.public_key = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			case PacketRole.REQUEST:
				this.mongo.getPublicKey(packet).subscribe(data => {

					data.role = PacketRole.SUCCESS;
					let reply : PublicKeyPacket = new PublicKeyPacket(data);

					result.next(reply);
					result.complete();
				}, error => {
					packet.public_key = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			default:
				throw 'Cannot handle PublicKeyPacket with role ' + packet.packet_header.role;
		}

		return result;
	}
}
