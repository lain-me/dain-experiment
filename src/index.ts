import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';

import { resolve } from 'path';
import { MongoClient } from 'mongodb';

import chalk from 'chalk';

import { App } from './stack/app';

const express_server = express();
const http_server = new http.Server(express_server);
const io_server = io(http_server);

const url = 'mongodb://mongodb/';

process.env.USER = process.env.USER || '';

let app = new App({name : process.env.USER});

express_server.get('/', (req : express.Request, res : express.Response) => {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected correctly to server');
			db.close();
		}
	});
	res.sendFile(resolve('template/index.html'));
});

io_server.on('connection', function (socket) {
	console.log('a user ' + chalk.bgBlueBright(process.env.USER) + 'connected');
});

http_server.listen(3000, function () {
	console.log(chalk.bgBlackBright(process.env.USER) + ' listening on *:3000');
});
