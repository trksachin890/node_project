const Employee = require('../models/employeeModel');
const express = require('express')
const app = express()
app.set('view engine','ejs')

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.getAll();
    res.render('pages/employees', { employees });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const employeeId = parseInt(id, 10);

  if (isNaN(employeeId)) {
    return res.status(400).send('Invalid employee ID');
  }

  try {
    const employee = await Employee.getById(employeeId);
    if (employee) {
      res.render('pages/employee', { employee });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.displayCreateForm = (req, res) => {
  res.render('pages/createEmployee');
};

exports.createEmployee = async (req, res) => {
  if (!req.body) {
    return res.status(400).send('Invalid request: No request body');
  }
  const { name, email, position } = req.body;
  try {
    const newEmployee = await Employee.create({ name, email, position });
    res.redirect('/');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.displayEditForm = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.getById(id);
    if (employee) {
      res.render('pages/editEmployee', { employee });
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position } = req.body;
  try {
    const updatedEmployee = await Employee.update(id, { name, email, position });
    res.redirect('/');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Employee.delete(id);
    if (result === 1) {
      res.redirect('/');
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
};
