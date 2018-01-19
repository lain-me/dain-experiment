import { GenericPacket } from '../stack/packets';
import * as net from 'net';

export class PacketDecisionMaker {
	static handle(uid : number, packet : GenericPacket, socket : net.Socket)
	{
	}
}
