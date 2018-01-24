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
					let data = packet.toObject();
					data.public_key = null;
					data.packet_header.role = PacketRole.SUCCESS;

					let reply : PublicKeyPacket = new PublicKeyPacket(data);
					result.next(reply);
					result.complete();

				}, error => {
					let data = packet.toObject();
					result.error(error);
				});
				break;
			case PacketRole.REQUEST:
				this.mongo.getPublicKey(packet).subscribe(data => {
					data.packet_header.role = PacketRole.SUCCESS;

					let reply : PublicKeyPacket = new PublicKeyPacket(data);
					result.next(reply);
					result.complete();
				}, error => {
					console.log(error);
				});
				break;
		}

		return result;
	}
}
