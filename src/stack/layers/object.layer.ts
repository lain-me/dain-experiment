import { Observable } from 'rxjs';
import { ProtocolLayer } from '../core';

import { Dain } from '../dain';
import { GenericPacket } from '../packets';

export class ObjectLayer extends ProtocolLayer<GenericPacket> {

	constructor(private app : Dain)
	{
		super();

		console.log('ObjectLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		super.receive(packet);
		console.log('ObjectLayer receive');
	}

	transmit(packet : GenericPacket) : Observable<GenericPacket>
	{
		console.log('ObjectLayer transmit');
		return super.transmit(packet);
	}
}
