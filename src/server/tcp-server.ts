import * as net from 'net';

// import * as _ from 'lodash';
import chalk from 'chalk';

import { SocketDecrypt } from '../common';
import { GenericPacket } from '../stack/packets';
import { PacketParser } from '../common/packet-parser';
import { PacketDecisionMaker } from './handlers';
import { MongoProxy } from './mongo-proxy';

export class TcpServer {
	sockets = {};
	server : net.Server = null;

	constructor()
	{
	}

	run()
	{
		let mongo = new MongoProxy();

		this.server = net.createServer((socket) => {
			socket.on('close', () => {
				delete this.sockets[socket.remoteAddress];
			});

			socket.on('data', (data : string) => {
				let message = SocketDecrypt.decrypt(data);
				let packet : GenericPacket = PacketParser.messageToPacket(message.body);
				PacketDecisionMaker.handle({uid : message.id, packet, socket, mongo});

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
