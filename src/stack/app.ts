import { ProtocolStack } from './core/protocol-stack';
import { Config } from './config';

import { StorageLayer, EncryptionLayer, DataLayer } from './layers';
import { NetworkClient, ApplicationClient } from './clients';


export class App {
	public stack : ProtocolStack = null;
	public config : Config = null;
	public network_client : NetworkClient;
	public application_client : ApplicationClient;

	constructor(params : { name : string })
	{
		this.config = new Config();
		this.config.env_name = params.name;

		this.init();
	}

	init()
	{
		this.stack = new ProtocolStack();

		this.network_client = new NetworkClient(this.stack);
		this.application_client = new ApplicationClient(this.stack);

		this.stack.addLayer(new StorageLayer(this, this.network_client));
		this.stack.addLayer(new EncryptionLayer(this));
		this.stack.addLayer(new DataLayer(this, this.application_client));

		this.stack.init();

		// console.log('Highest layer: ' + this.stack.highestLayer.constructor.name);
		// console.log('Lowest layer: ' + this.stack.lowestLayer.constructor.name);
	}
}
