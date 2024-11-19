// routes/studentsRoutes.js
const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deleteStudent} = require('../controllers/studentsControllers');

router.get('/', getStudents);
router.post('/', createStudent);
router.put('/:matricula', updateStudent);
router.delete('/:matricula', deleteStudent);

module.exports = router;
