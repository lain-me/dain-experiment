import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import { resolve } from 'path';

import { GenericPacket, GenericStack } from '../packets';

import chalk from 'chalk';

export class ApplicationClient {
	express_server;
	http_server;
	io_server;

	constructor(private stack : GenericStack)
	{
		this.initApplicationClient();
	}

	initApplicationClient()
	{
		this.express_server = express();
		this.http_server = new http.Server(this.express_server);
		this.io_server = io(this.http_server);

		this.express_server.get('/', (req : express.Request, res : express.Response) => {
			res.sendFile(resolve('template/index.html'));
		});

		this.io_server.on('connection', (socket) => {
			console.log('a user ' + chalk.bgBlueBright(process.env.USER) + ' connected');


			socket.on('disconnect', () => {
				console.log('user ' + chalk.bgBlueBright(process.env.USER) + ' disconnected');
			});

			socket.on('chat message', (msg) => {
				console.log('\r\n\r\nmessage from user ' + chalk.bgBlueBright(process.env.USER) + ' : ' + msg);

				let packet : GenericPacket = new GenericPacket();
				packet.unchanged_msg = msg;
				this.stack.handleTransmit(packet);
			});
		});

		this.http_server.listen(3000, () => {
			console.log(chalk.bgBlackBright(process.env.USER) + ' listening on *:3000');
		});
	}

	receive(msg : any)
	{
		console.log('ApplicationClient receive');
		this.io_server.emit('chat message', msg);
	}
}
