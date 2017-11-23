// https://gist.github.com/tedmiston/5935757

/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp
server, but for some reason omit a client connecting to it.  I added an
example at the bottom.
Save the following server in example.js:
*/

import * as net from 'net';
import { MongoClient } from 'mongodb';
import chalk from 'chalk';
import * as _ from 'lodash';

const url = 'mongodb://mongodb/';

let sockets = {};
let server = net.createServer((socket) => {
	socket.on('close', () => {
		delete sockets[socket.remoteAddress];
	});

	socket.on('data', data => {
		_.each(sockets, (s, address) => {
			s.write(data);
		});
	});
});

server.listen(13337, 'tcpserver');

server.on('connection', (socket) => {
	console.log(chalk.bgBlackBright('TCP Server was connected by '), socket.remoteAddress);
	sockets[socket.remoteAddress] = socket;
});

server.on('close', () => {
});

server.on('error', (error) => {
	console.log(error);
	console.log(chalk.bgBlackBright(error.message));
});

let connect_mongodb = () => {
	MongoClient.connect(url, (err, db) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected correctly to server');
			db.close();
		}
	});
};
