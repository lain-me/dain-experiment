import { ProtocolStack } from '../core/protocol-stack';
import { TcpClient } from './tcp-client';
import { GenericPacket } from '../packets';

export class NetworkClient {
	tcp_client : TcpClient;

	constructor(private stack : ProtocolStack)
	{
		this.initTcpClient();
	}

	initTcpClient()
	{
		this.tcp_client = new TcpClient();
		this.tcp_client.connection();

		this.tcp_client.client.addListener('data', (data) => {
			// io_server.emit('chat message', data.toString());
			let packet : GenericPacket = new GenericPacket();
			packet.unchanged_msg = data.toString();
			this.stack.handleReceive(packet);
		});
	}

	send(msg : any)
	{
		console.log('NetworkClient receive');

		this.tcp_client.client.write(msg);
	}

}
