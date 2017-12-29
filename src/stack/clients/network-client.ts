import { Observable, Observer } from 'rxjs';

import { SocketMessage, SocketEncrypt, SocketDecrypt } from '../../common';
import { ProtocolStack } from '../core/protocol-stack';
import { GenericPacket } from '../packets';

import { TcpSocket } from './tcp-socket';

export interface MessageObserver {
	timestamp : number,
	observer : Observer<GenericPacket>,
}

export interface MessagesMap {
	[id : number] : MessageObserver
}

export class NetworkClient {
	uuid = 0;
	sent = 0;
	received = 0;
	tcp_socket : TcpSocket;

	waiting_messages : MessagesMap = {};


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

			const raw_message = data.toString();
			const msg : SocketMessage = SocketDecrypt.decrypt(raw_message);
			packet.unchanged_msg = msg.body;

			this.received++;

			this.stack.handleReceive(packet);
		});
	}

	send(msg : any) : Observable<GenericPacket>
	{
		console.log('NetworkClient receive');

		return Observable.create((observer : Observer<GenericPacket>) => {
			const uid = ++this.uuid;
			let socket_msg : SocketMessage = {
				id   : uid,
				body : msg
			};

			if (this.waiting_messages[uid]) throw Error('something wrong with message queue');

			this.waiting_messages[uid] = {
				timestamp : +new Date(),
				observer
			};

			this.sent++;

			this.tcp_socket.rawSocket.write(SocketEncrypt.encrypt(socket_msg));
		});
	}
}
