import { MongoClient, MongoError } from 'mongodb';

export class MongoProxy {
	url = 'mongodb://mongodb/';
	db : MongoClient = null;

	constructor()
	{
		this.connect_mongodb().then((db : MongoClient) => {
			console.log('Connected correctly to server');
			this.db = db;
		});
	}

	connect_mongodb()
	{
		return MongoClient.connect(this.url).catch((error : MongoError) => {
			console.log(error);
		});
	}

	insertPublicKey()
	{
	}

	getPublicKey()
	{
	}
}
