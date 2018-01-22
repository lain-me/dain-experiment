import * as net from 'net';
import { MongoClient } from 'mongodb';

// import * as _ from 'lodash';
import chalk from 'chalk';

import { SocketDecrypt } from '../common';
import { GenericPacket } from '../stack/packets';
import { PacketParser } from '../common/packet-parser';
import { PacketDecisionMaker } from './handlers';

export class TcpServer {
	url = 'mongodb://mongodb/';
	sockets = {};
	server : net.Server = null;

	constructor()
	{
	}

	run()
	{
		this.server = net.createServer((socket) => {
			socket.on('close', () => {
				delete this.sockets[socket.remoteAddress];
			});

			socket.on('data', (data : string) => {
				let message = SocketDecrypt.decrypt(data);
				let packet : GenericPacket = PacketParser.messageToPacket(message.body);
				PacketDecisionMaker.handle(message.id, packet, socket);

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
		)
		;

		this.server.on('close', () => {
		});

		this.server.on('error', (error) => {
			console.log(error);
			console.log(chalk.bgBlackBright(error.message));
		});
	}

	connect_mongodb()
	{
		MongoClient.connect(this.url, (err, db) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Connected correctly to server');
				db.close();
			}
		});
	};
}
