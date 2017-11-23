import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';
import { GenericPacket } from '../packets';

export class EncryptionLayer extends ProtocolLayer {
	constructor(private app : App)
	{
		super();

		console.log('EncryptionLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		super.receive(packet);
		console.log('EncryptionLayer receive');
	}

	transmit(packet : GenericPacket)
	{
		super.transmit(packet);
		console.log('EncryptionLayer transmit');
	}
}
