const dotenv = require('dotenv');
const mysql2 = require('mysql2/promise');

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

class Employee {
  constructor({ id, name, email, position }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.position = position;
  }

  static async getAll() {
    const connection = await mysql2.createConnection(databaseUrl);
    const [rows] = await connection.execute('SELECT * FROM employees ORDER BY id');
    connection.end();
    return rows.map((data) => new Employee(data));
  }

  static async getById(id) {
    const connection = await mysql2.createConnection(databaseUrl);
    const [rows] = await connection.execute('SELECT * FROM employees WHERE id = ? LIMIT 1', [id]);
    connection.end();
    
    if (rows.length === 0) {
      return null;
    }

    return new Employee(rows[0]);
  }

  static async create(employee) {
    const { name, email, position } = employee;
    const connection = await mysql2.createConnection(databaseUrl);
    const [rows] = await connection.execute(
      'INSERT INTO employees(name, email, position) VALUES(?, ?, ?)',
      [name, email, position]
    );
    connection.end();

    const insertedEmployee = await this.getById(rows.insertId);
    return insertedEmployee;
  }

  static async update(id, updatedEmployee) {
    const { name, email, position } = updatedEmployee;
    const connection = await mysql2.createConnection(databaseUrl);
    const [rows] = await connection.execute(
      'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
      [name, email, position, id]
    );
    connection.end();

    if (rows.affectedRows === 0) {
      return null;
    }

    const updatedData = await this.getById(id);
    return updatedData;
  }

  static async delete(id) {
    try {
      const connection = await mysql2.createConnection(databaseUrl);
      const [rows] = await connection.execute('DELETE FROM employees WHERE id = ?', [id]);
      connection.end();
  
      if (rows.affectedRows > 0) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error; 
    }
  }  
}

module.exports = Employee;
