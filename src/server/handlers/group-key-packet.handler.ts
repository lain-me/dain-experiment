import * as net from 'net';

import { GroupKeyPacket } from '../../stack/packets';

export class GroupKeyPacketHandler {
	static handle(uid : number, packet : GroupKeyPacket, socket : net.Socket)
	{
	}
}
