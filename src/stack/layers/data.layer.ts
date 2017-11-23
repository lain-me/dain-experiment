import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';
import { ApplicationClient } from '../clients/application-client';
import { ProtocolPacket } from '../core/protocol-packet';
import { GenericPacket } from '../packets';

export class DataLayer extends ProtocolLayer {
	constructor(private app : App, private application : ApplicationClient)
	{
		super();

		console.log('DataLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		super.receive(packet);
		console.log('DataLayer receive');
	}

	transmit(packet : GenericPacket)
	{
		console.log('DataLayer transmit');
		this.application.receive(packet.unchanged_msg);
	}
}
