import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';

export class Data extends ProtocolLayer {
	constructor(private app : App)
	{
		super();

		console.log('Data layer is initialized for ' + app.config.env_name);
	}
}
