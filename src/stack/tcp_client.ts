// https://gist.github.com/tedmiston/5935757

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

import * as net from 'net';

let client = new net.Socket();


client.connect(1337, '127.0.0.1', () => {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', (data) => {
	console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('error', (err) => {
	console.log(err);
});

client.on('close', () => {
	console.log('Connection closed');
});


