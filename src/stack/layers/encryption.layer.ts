import { ProtocolLayer } from '../core/protocol-layer';
import { App } from '../app';
import { GenericPacket, PublicKeyPacket } from '../packets';

import { pki, md } from 'node-forge';
import { resolve } from 'path';
import * as fs from 'fs';

export class EncryptionLayer extends ProtocolLayer {
	private key : pki.KeyPair = null;
	private uid : any;

	constructor(private app : App)
	{
		super();

		console.log('EncryptionLayer is initialized for ' + app.config.env_name);
	}

	init()
	{
		super.init();
		this.initKeys();
	}

	initKeys()
	{
		console.log('Starting key initialization');
		let privateKey : pki.Key = null;
		let publicKey : pki.Key = null;

		let pri_file = resolve('temp/' + this.app.config.env_name + '.pem');
		let pem = null;
		try {
			pem = fs.readFileSync(pri_file, 'utf8');
		} catch (e) {
		}

		if (pem) {
			privateKey = pki.privateKeyFromPem(pem);
			publicKey = (<any>pki).setRsaPublicKey(privateKey.n, privateKey.e);
			this.key = {
				publicKey  : publicKey,
				privateKey : privateKey
			};

			this.getCurrentUid();
		} else {
			this.key = pki.rsa.generateKeyPair();
			pem = pki.privateKeyToPem(this.key.privateKey);
			fs.writeFileSync(pri_file, pem, 'utf8');

			this.getCurrentUid();
			this.publishKey();
		}
	}

	getCurrentUid()
	{
		if (this.key.publicKey) {
			let digest = md.sha256.create();
			digest.update(this.key.publicKey);
			this.uid = digest.digest().toHex();
		}
	}

	publishKey()
	{
		let packet : PublicKeyPacket = new PublicKeyPacket();

		packet.creator_uid = this.uid;
		packet.key_owner_uid = this.uid;
		packet.public_key = this.key.publicKey;

		this.transmit(packet);
	}

	receive(packet : GenericPacket)
	{
		super.receive(packet);
		console.log('EncryptionLayer receive');
	}

	transmit(packet : GenericPacket)
	{
		super.transmit(packet);
		console.log('EncryptionLayer transmit');
	}
}
