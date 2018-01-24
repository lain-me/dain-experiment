import { Observable, Subject } from 'rxjs';

import { MongoProxy } from '../mongo-proxy';
import { DataPacket, GenericPacket } from '../../stack/packets';

export class DataPacketHandler {
	constructor(private mongo : MongoProxy)
	{
	}

	handle(packet : DataPacket) : Observable<GenericPacket>
	{
		let result = new Subject<GenericPacket>();

		return result;
	}
}
