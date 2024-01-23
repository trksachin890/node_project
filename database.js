const dotenv = require('dotenv');
const mysql2 = require('mysql2');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

const db = mysql2.createConnection(databaseUrl);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS employees (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      position VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (queryError, results) => {
    if (queryError) {
      console.error('Error creating table:', queryError);
    } else {
      console.log('Table created successfully');
    }

    db.end();
  });
});

module.exports = db;
