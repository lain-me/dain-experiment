import { ProtocolStack } from '../core/protocol-stack';
import { TcpSocket } from './tcp-socket';
import { GenericPacket } from '../packets';

export class NetworkClient {
	tcp_socket : TcpSocket;

	constructor(private stack : ProtocolStack)
	{
		this.initNetworkClient();
	}

	initNetworkClient()
	{
		this.tcp_socket = new TcpSocket();
		this.tcp_socket.connection();

		this.tcp_socket.rawSocket.addListener('data', (data) => {
			// io_server.emit('chat message', data.toString());
			let packet : GenericPacket = new GenericPacket();
			packet.unchanged_msg = data.toString();
			this.stack.handleReceive(packet);
		});
	}

	send(msg : any)
	{
		console.log('NetworkClient receive');

		this.tcp_socket.rawSocket.write(msg);
	}

}
