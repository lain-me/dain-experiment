import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

import { resolve } from 'path';

import chalk from 'chalk';

import { App } from './stack/app';

const express_server = express();
const http_server = new http.Server(express_server);
const io_server = io(http_server);

process.env.USER = process.env.USER || '';

let app = new App({name : process.env.USER});

express_server.get('/', (req : express.Request, res : express.Response) => {
	res.sendFile(resolve('template/index.html'));
});

io_server.on('connection', function (socket) {
	console.log('a user ' + chalk.bgBlueBright(process.env.USER) + ' connected');
	socket.on('disconnect', function () {
		console.log('user ' + chalk.bgBlueBright(process.env.USER) + ' disconnected');
	});
	socket.on('chat message', function (msg) {
		console.log('message from user ' + chalk.bgBlueBright(process.env.USER) + ' : ' + msg);
		io_server.emit('chat message', msg);
	});
});

http_server.listen(3000, function () {
	console.log(chalk.bgBlackBright(process.env.USER) + ' listening on *:3000');
});
