import * as net from 'net';

import { PublicKeyPacket } from '../../stack/packets';

export class PublicKeyPacketHandler {
	static handle(uid : number, packet : PublicKeyPacket, socket : net.Socket)
	{
	}
}
