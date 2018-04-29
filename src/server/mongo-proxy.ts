import { Observable, from } from 'rxjs';
import { InsertOneWriteOpResult, MongoClient, MongoError } from 'mongodb';

import { DataPacket, GroupKeyPacket, PublicKeyPacket } from '../stack/packets';

const publicKeyTable = 'PublicKeyCollection';
const groupKeyTable = 'GroupKeyCollection';
const dataTable = 'DataCollection';

export class MongoProxy {
	url = 'mongodb://mongodb/';
	client : MongoClient = null;
	db = null;

	constructor()
	{
		this.connect_mongodb().then((client : MongoClient) => {
			console.log('Connected correctly to server');
			this.client = client;
			this.db = this.client.db('DAIN');
		});
	}

	connect_mongodb()
	{
		return MongoClient.connect(this.url).catch((error : MongoError) => {
			console.log(error);
		});
	}

	insertPublicKey(packet : PublicKeyPacket) : Observable<InsertOneWriteOpResult>
	{
		let data = packet.toObject();
		return from(this.db.collection(publicKeyTable).insertOne(data));
	}

	getPublicKey(packet : PublicKeyPacket) : Observable<any | null>
	{
		let search = {'key_owner_uid' : packet.key_owner_uid};
		return from(this.db.collection(publicKeyTable).findOne(search));
	}

	insertData(packet : DataPacket) : Observable<InsertOneWriteOpResult>
	{
		let data = packet.toObject();
		return from(this.db.collection(dataTable).insertOne(data));
	}

	getData(packet : DataPacket) : Observable<any | null>
	{
		let search = {'data_id' : packet.data_id};
		return from(this.db.collection(dataTable).findOne(search));
	}

	insertGroupKey(packet : GroupKeyPacket) : Observable<InsertOneWriteOpResult>
	{
		let data = packet.toObject();
		return from(this.db.collection(groupKeyTable).insertOne(data));
	}

	getGroupKey(packet : GroupKeyPacket) : Observable<any | null>
	{
		let search = {'group_id' : packet.group_id, 'permission_uid' : packet.permission_uid};
		return from(this.db.collection(groupKeyTable).findOne(search));
	}
}
