import { ProtocolStack } from './core/protocol-stack';
import { Storage, Encryption, Data } from './layers';
import { Config } from './config';

export class App {
	private stack : ProtocolStack = null;
	public config : Config = null;

	constructor(params : { name : string })
	{
		this.config = new Config();
		this.config.env_name = params.name;

		this.init();
	}

	init()
	{
		this.stack = new ProtocolStack();

		this.stack.addLayer(new Storage(this));
		this.stack.addLayer(new Encryption(this));
		this.stack.addLayer(new Data(this));
	}
}
