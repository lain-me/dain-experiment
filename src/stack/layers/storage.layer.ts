import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';

export class Storage extends ProtocolLayer {
	constructor(private app : App)
	{
		super();

		console.log('Storage layer is initialized for ' + app.config.env_name);
	}
}
