var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://mongodb/';

process.env.USER = process.env.USER || "";

app.get('/', function(req, res){
	MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected correctly to server");
            db.close();
        }

    });
  res.send("Hello World from " + process.env.USER);
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});
