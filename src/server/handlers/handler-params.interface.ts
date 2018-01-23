import * as net from 'net';

import { DataPacket, GenericPacket, GroupKeyPacket, PublicKeyPacket } from '../../stack/packets';
import { MongoProxy } from '../mongo-proxy';

export interface HandlerParams {
	uid? : number,
	packet? : GenericPacket | GroupKeyPacket | DataPacket | PublicKeyPacket,
	socket? : net.Socket,
	mongo? : MongoProxy
}
