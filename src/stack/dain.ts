import { Config } from './config';

import { StorageLayer, EncryptionLayer, DataLayer, ObjectLayer, ApplicationLayer } from './layers';
import { NetworkClient, ApplicationClient } from './clients';
import { GenericStack } from './packets';

export class Dain {

	public stack : GenericStack = null;
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
		this.stack = new GenericStack();

		this.network_client = new NetworkClient(this.stack);
		this.application_client = new ApplicationClient(this.stack);

		this.stack.addLayer(new StorageLayer(this, this.network_client));
		this.stack.addLayer(new EncryptionLayer(this));
		this.stack.addLayer(new DataLayer(this));
		this.stack.addLayer(new ObjectLayer(this));
		this.stack.addLayer(new ApplicationLayer(this, this.application_client));

		this.stack.init();
	}
}
