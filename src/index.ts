import * as express from 'express';
import { MongoClient } from 'mongodb';
import chalk from 'chalk';

import { Data } from './stack/data';
import { Encryption } from './stack/encryption';
import { Storage } from './stack/storage';

const app = express();
const url = 'mongodb://mongodb/';

process.env.USER = process.env.USER || '';

app.get('/', (req, res) => {
	MongoClient.connect(url, function (err, db) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected correctly to server');
			db.close();
		}

	});
	res.send('Hello World from ' + process.env.USER);
});

app.listen(3000, () => {
	console.log(chalk.green('Example app listening on port 3000!'));
});
