// https://gist.github.com/tedmiston/5935757

/* Or use this example tcp client written in node.js.  (Originated with
example code from
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

import * as net from 'net';

const MAX_CONNECTION_ATTEMPT = 10;
const MAX_CONNECTION_ATTEMPT_TIMEOUT = 10000;

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
	private connection_retry = 0;

	constructor()
	{
	}

	tryConnect()
	{
		this.rawSocket.connect(13337, 'tcpserver', () =>
		{
			console.log('Connected');
			this.connection_retry = 0;
		});
	}

	establishSocket()
	{
		this.rawSocket = new net.Socket();
		this.count = 1;

		this.tryConnect();

		this.rawSocket.on('data', (data) =>
		{
			console.log('Received: ' + data);
			// this.client.destroy(); // kill this.client after server's response
		});

		this.rawSocket.on('error', (err) =>
		{
			if (this.connection_retry++ < MAX_CONNECTION_ATTEMPT) {
				console.log("Failed to connect to server, retrying...");
				setTimeout(() =>
				{
					this.tryConnect();
				}, MAX_CONNECTION_ATTEMPT_TIMEOUT)
			} else {
				console.error("Error", err);
			}
		});

		this.rawSocket.on('close', () =>
		{
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



