import * as net from 'net';

import { DataPacket } from '../../stack/packets';

export class DataPacketHandler {
	static handle(uid : number, packet : DataPacket, socket : net.Socket)
	{
	}
}
