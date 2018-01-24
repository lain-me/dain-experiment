import { Observable, Subject } from 'rxjs';

import { MongoProxy } from '../mongo-proxy';
import { DataPacket, GenericPacket, PacketRole } from '../../stack/packets';

export class DataPacketHandler {
	constructor(private mongo : MongoProxy)
	{
	}

	handle(packet : DataPacket) : Observable<GenericPacket>
	{
		let result = new Subject<GenericPacket>();

		switch (packet.packet_header.role) {
			case PacketRole.PUBLISH:
				this.mongo.insertData(packet).subscribe(res => {

					// Piggybacking packet
					packet.enc_data = null;
					packet.packet_header.role = PacketRole.SUCCESS;

					result.next(packet);
					result.complete();

				}, error => {
					packet.enc_data = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			case PacketRole.REQUEST:
				this.mongo.getData(packet).subscribe(data => {

					data.role = PacketRole.SUCCESS;
					let reply : DataPacket = new DataPacket(data);

					result.next(reply);
					result.complete();
				}, error => {
					packet.enc_data = null;
					packet.packet_header.role = PacketRole.FAILURE;

					result.next(packet);
					result.complete();
				});
				break;
			default:
				throw 'Cannot handle DataPacket with role ' + packet.packet_header.role;
		}

		return result;
	}
}
