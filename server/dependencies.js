const file = require("fs");

const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const connectRedis = require("connect-redis");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const mysql = require("mysql");
const redis = require("redis");

const redisStore = connectRedis(session);
const client = redis.createClient();

const credentials = require("./credentials.json");

const jobs = express();
const connection = mysql.createConnection(credentials);
const secret = bcrypt.hashSync("Twitch.tv/Skerpio", 8);

jobs.use(bodyParser.urlencoded({ extended: true }));
jobs.use(bodyParser.json());
jobs.use(cookieParser());
jobs.use(session({secret: secret,
		  store: new redisStore({host: "localhost",
					 port: 6379,
					 client: client,
					 ttl : 260}),
		  saveUninitialized: false,
		  resave: false}));

module.exports = {
    startServer: function(port) {
	jobs.listen(port);
	console.log("Server open on port", port);
    },
    base64toJSON: function(blob) {
	const regex = /[data:]+((\S+)\/(\S+));[base64,]+(\S+)/;
	const results = blob.match(regex);
	return ({
	    blob: results[0],
	    mime: results[1],
	    type: results[2],
	    format: results[3],
    	    data: results[4]
	});
    },
    base64toFile: function(base64JSON, path, name) {
	const base64data = base64JSON.data;
	const filename = path + name + '.' + base64JSON.format;
	file.writeFile(filename, base64data, "base64", function(error) {
    	    if (error)
    		console.error(error);
	});
    },
    bcrypt,
    bodyParser,
    express,
    session,
    file,
    jobs,
    connection
};
