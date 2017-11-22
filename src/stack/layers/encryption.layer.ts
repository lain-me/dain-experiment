import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';

export class Encryption extends ProtocolLayer {
	constructor(private app : App)
	{
		super();

		console.log('Encryption layer is initialized for ' + app.config.env_name);
	}
}
