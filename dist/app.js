"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongodb_1 = require("mongodb");
var chalk_1 = require("chalk");
var app = express();
var url = 'mongodb://mongodb/';
process.env.USER = process.env.USER || '';
app.get('/', function (req, res) {
    mongodb_1.MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Connected correctly to server');
            db.close();
        }
    });
    res.send('Hello World from ' + process.env.USER);
});
app.listen(3000, function () {
    console.log(chalk_1.default.blue('Example app listening on port 3000!'));
});
