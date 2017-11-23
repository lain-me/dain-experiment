import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';
import { GenericPacket } from '../packets';
import { NetworkClient } from '../clients/network-client';

export class StorageLayer extends ProtocolLayer {


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

	transmit(packet : GenericPacket)
	{
		console.log('StorageLayer transmit');
		this.network.send(packet.unchanged_msg);
	}
}
