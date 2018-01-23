import { PacketRole, PublicKeyPacket } from '../../stack/packets';

import { SocketMessage, SocketEncrypt } from '../../common';
import { HandlerParams } from './handler-params.interface';

export class PublicKeyPacketHandler {
	static handle(packet : PublicKeyPacket, params : HandlerParams)
	{
		switch (packet.packet_header.role) {
			case PacketRole.PUBLISH:
				params.mongo.insertPublicKey(packet).subscribe(res => {
				}, error => {
					console.log(error);
				});
				break;
			case PacketRole.REQUEST:
				params.mongo.getPublicKey(packet).subscribe(data => {
					let socket_msg : SocketMessage = {
						id   : params.uid,
						body : JSON.stringify(data)
					};

					let msg = SocketEncrypt.encrypt(socket_msg);

					params.socket.write(msg);
				}, error => {
					console.log(error);
				});
				break;
		}
	}
}
