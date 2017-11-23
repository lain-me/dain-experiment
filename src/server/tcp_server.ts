// https://gist.github.com/tedmiston/5935757

/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp
server, but for some reason omit a client connecting to it.  I added an
example at the bottom.
Save the following server in example.js:
*/

import * as net from 'net';
import { MongoClient } from 'mongodb';

const url = 'mongodb://mongodb/';

let server = net.createServer((socket) => {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

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
