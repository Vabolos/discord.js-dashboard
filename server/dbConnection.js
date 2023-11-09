const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	database: process.env.DBNAME,
};

const connection = mysql.createConnection(dbConfig);

module.exports = connection;