import { Observable } from 'rxjs';
import { ProtocolLayer } from '../core/protocol-layer';

import { App } from '../app';
import { GenericPacket } from '../packets';
import { ApplicationClient } from '../clients';

export class DataLayer extends ProtocolLayer<GenericPacket> {
	constructor(private app : App, private application : ApplicationClient)
	{
		super();

		console.log('DataLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		this.application.receive(packet.unchanged_msg);
		console.log('DataLayer receive');
	}

	transmit(packet : GenericPacket) : Observable<GenericPacket>
	{
		console.log('DataLayer transmit');
		return super.transmit(packet);
	}
}
