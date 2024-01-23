const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/create', employeeController.displayCreateForm);

router.post('/create', employeeController.createEmployee);

router.get('/:id/edit', employeeController.displayEditForm);

router.post('/:id/edit', employeeController.updateEmployee);

router.post('/:id/delete', employeeController.deleteEmployee);

router.get('/:id', employeeController.getEmployeeById);

router.get('/', employeeController.getAllEmployees);

module.exports = router;
