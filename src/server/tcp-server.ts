import * as net from 'net';

// import * as _ from 'lodash';
import chalk from 'chalk';

import { PacketDecisionMaker } from './handlers';
import { MongoProxy } from './mongo-proxy';
import { GenericPacket } from '../stack/packets';
import { SocketHelper } from '../common/message';

export class TcpServer {
	sockets = {};
	server : net.Server = null;
	handler : PacketDecisionMaker = null;

	constructor()
	{
		let mongo = new MongoProxy();
		this.handler = new PacketDecisionMaker(mongo);
	}

	run()
	{
		this.server = net.createServer((socket) => {
			socket.on('close', () => {
				delete this.sockets[socket.remoteAddress];
			});

			socket.on('data', (data : string) => {
				let {id, packet} = SocketHelper.socketMessageToPacket(data);

				this.handler.handle(packet)
				.subscribe(
					(reply : GenericPacket) => {
						let msg = SocketHelper.packetToSocketMessage({id, packet : reply});
						socket.write(msg);
					});

				// _.each(this.sockets, (s, address) => {
				// 	s.write(data);
				// });
			});
		});

		this.server.listen(13337, 'tcpserver');

		this.server.on('connection',
			(socket) => {
				console.log(chalk.bgBlackBright('TCP Server was connected by '), socket.remoteAddress);
				this.sockets[socket.remoteAddress] = socket;
			}
		);

		this.server.on('close', () => {
		});

		this.server.on('error', (error) => {
			console.log(error);
			console.log(chalk.bgBlackBright(error.message));
		});
	}
}
