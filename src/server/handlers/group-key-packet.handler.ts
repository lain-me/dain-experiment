import { Observable, Subject } from 'rxjs';

import { MongoProxy } from '../mongo-proxy';
import { GenericPacket, GroupKeyPacket, PacketRole } from '../../stack/packets';

export class GroupKeyPacketHandler {
	constructor(private mongo : MongoProxy)
	{
	}

	handle(packet : GroupKeyPacket) : Observable<GenericPacket>
	{
		let result = new Subject<GenericPacket>();

		switch (packet.packet_header.role) {
			case PacketRole.PUBLISH:
				this.mongo.insertGroupKey(packet).subscribe(res => {

					// Piggybacking packet
					packet.enc_symm_key = null;
					packet.packet_header.role = PacketRole.SUCCESS;

					result.next(packet);
					result.complete();

				}, error => {
					packet.enc_symm_key = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			case PacketRole.REQUEST:
				this.mongo.getGroupKey(packet).subscribe(data => {

					data.role = PacketRole.SUCCESS;
					let reply : GroupKeyPacket = new GroupKeyPacket(data);

					result.next(reply);
					result.complete();
				}, error => {
					packet.enc_symm_key = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			default:
				throw 'Cannot handle GroupKeyPacket with role ' + packet.packet_header.role;
		}

		return result;
	}
}
