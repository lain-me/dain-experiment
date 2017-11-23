import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

import { resolve } from 'path';

import chalk from 'chalk';

import { App } from './stack/app';
import { TcpClient } from './stack/tcp-client';

const express_server = express();
const http_server = new http.Server(express_server);
const io_server = io(http_server);

process.env.USER = process.env.USER || '';

let app = new App({name : process.env.USER});
let tcp_client = null;
let count = 0;

express_server.get('/', (req : express.Request, res : express.Response) => {
	res.sendFile(resolve('template/index.html'));
});

io_server.on('connection', function (socket) {
	console.log('a user ' + chalk.bgBlueBright(process.env.USER) + ' connected');
	if (!tcp_client) {
		tcp_client = new TcpClient();
		count++;
	}
	tcp_client.client.addListener('data', (data) => {
		io_server.emit('chat message', data.toString());
	});

	socket.on('disconnect', function () {
		count--;
		if (count <= 0) {
			count = 0;
			tcp_client.client.destroy();
			tcp_client = null;
		}
		console.log('user ' + chalk.bgBlueBright(process.env.USER) + ' disconnected');
	});

	socket.on('chat message', function (msg) {
		console.log('message from user ' + chalk.bgBlueBright(process.env.USER) + ' : ' + msg);
		tcp_client.client.write(msg);
		io_server.emit('chat message', msg);
	});
});

http_server.listen(3000, function () {
	console.log(chalk.bgBlackBright(process.env.USER) + ' listening on *:3000');
});
