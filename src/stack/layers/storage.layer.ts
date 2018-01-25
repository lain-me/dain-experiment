import { Observable } from 'rxjs';
import { ProtocolLayer } from '../core/protocol-layer';

import { App } from '../app';
import { GenericPacket } from '../packets';
import { NetworkClient } from '../clients';

export class StorageLayer extends ProtocolLayer<GenericPacket> {


	constructor(private app : App, private network : NetworkClient)
	{
		super();

		console.log('StorageLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		super.receive(packet);
		console.log('StorageLayer receive');
	}

	transmit(packet : GenericPacket) : Observable<GenericPacket>
	{
		console.log('StorageLayer transmit');
		return this.network.send(packet.serialize());
	}
}
