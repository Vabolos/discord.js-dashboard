const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	database: process.env.DBNAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
		return;
	}
	console.log('Connected to the database');
});

module.exports = connection;
