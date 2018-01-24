import { Observable, Subject } from 'rxjs';

import { MongoProxy } from '../mongo-proxy';
import { GenericPacket, GroupKeyPacket } from '../../stack/packets';

export class GroupKeyPacketHandler {
	constructor(private mongo : MongoProxy)
	{
	}

	handle(packet : GroupKeyPacket) : Observable<GenericPacket>
	{
		let result = new Subject<GenericPacket>();

		return result;
	}
}
