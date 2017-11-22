import * as express from 'express';
import { MongoClient } from 'mongodb';
import chalk from 'chalk';

import { App } from './stack/app';

const server = express();
const url = 'mongodb://mongodb/';

process.env.USER = process.env.USER || '';

let app = new App({name: process.env.USER});

server.get('/', (req, res) => {
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

server.listen(3000, () => {
	console.log(chalk.green('Example app listening on port 3000!'));
});
