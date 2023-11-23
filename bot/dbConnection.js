const mysql = require('mysql2');
require('dotenv').config();

// call dotenv and load variables
const dbConfig = {
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	database: process.env.DBNAME,
};

const connection = mysql.createConnection(dbConfig);

// open the MySQL connection
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to the database:', err);
		return;
	}
	console.log('Connected to the database');
});

module.exports = connection;
