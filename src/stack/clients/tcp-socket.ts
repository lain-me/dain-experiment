// https://gist.github.com/tedmiston/5935757

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

import * as net from 'net';


export class TcpSocket {
	get rawSocket() : net.Socket
	{
		return this._rawSocket;
	}

	set rawSocket(value : net.Socket)
	{
		this._rawSocket = value;
	}

	private _rawSocket : net.Socket;
	private count = 0;

	constructor()
	{
	}

	establishSocket()
	{
		this.rawSocket = new net.Socket();
		this.count = 1;

		this.rawSocket.connect(13337, 'tcpserver', () => {
			console.log('Connected');
		});

		this.rawSocket.on('data', (data) => {
			console.log('Received: ' + data);
			// this.client.destroy(); // kill this.client after server's response
		});

		this.rawSocket.on('error', (err) => {
			console.log(err);
		});

		this.rawSocket.on('close', () => {
			console.log('Connection closed');
		});
	}

	connection()
	{
		if (this.count <= 0) this.establishSocket();
		else this.count++;
	}

	destroySocket()
	{
		this.count = 0;
		this.rawSocket.destroy();
	}

	disconnection()
	{
		this.count--;
		if (this.count <= 0) this.destroySocket();
	}
}



