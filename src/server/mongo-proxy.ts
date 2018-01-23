import { InsertOneWriteOpResult, MongoClient, MongoError } from 'mongodb';
import { PublicKeyPacket } from '../stack/packets';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

const publicKeyTable = 'PublicKeyCollection';
const groupKeyTable = 'PublicKeyCollection';
const dataTable = 'PublicKeyCollection';

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
		return Observable.fromPromise(this.db.collection(publicKeyTable).insertOne(data));
	}

	getPublicKey(packet : PublicKeyPacket) : Observable<any | null>
	{
		let search = {'key_owner_uid' : packet.key_owner_uid};
		return Observable.fromPromise(this.db.findOne(search));
	}
}
