import { Observable } from 'rxjs';
import { ProtocolLayer } from '../core';

import { Dain } from '../dain';
import { GenericPacket } from '../packets';
import { ApplicationClient } from '../clients';

export class ApplicationLayer extends ProtocolLayer<GenericPacket> {

	constructor(private app : Dain, private application : ApplicationClient)
	{
		super();

		console.log('ApplicationLayer is initialized for ' + app.config.env_name);
	}

	receive(packet : GenericPacket)
	{
		this.application.receive(packet.unchanged_msg);
		console.log('ApplicationLayer receive');
	}

	transmit(packet : GenericPacket) : Observable<GenericPacket>
	{
		console.log('ApplicationLayer transmit');
		return super.transmit(packet);
	}
}
