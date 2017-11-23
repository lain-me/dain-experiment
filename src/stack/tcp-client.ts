// https://gist.github.com/tedmiston/5935757

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

import * as net from 'net';


export class TcpClient {
	get client() : net.Socket
	{
		return this._client;
	}

	set client(value : net.Socket)
	{
		this._client = value;
	}

	private _client : net.Socket;

	constructor()
	{
		this.client = new net.Socket();

		this.client.connect(13337, 'tcpserver', () => {
			console.log('Connected');
		});

		this.client.on('data', (data) => {
			console.log('Received: ' + data);
			// this.client.destroy(); // kill this.client after server's response
		});

		this.client.on('error', (err) => {
			console.log(err);
		});

		this.client.on('close', () => {
			console.log('Connection closed');
		});

	}
}



