// routes/studentsRoutes.js
const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deleteStudent, getStudentsByMatricula} = require('../controllers/studentsControllers');

router.get('/', getStudents);
router.get('/:matricula', getStudentsByMatricula);
router.post('/', createStudent);
router.put('/:matricula', updateStudent);
router.delete('/:matricula', deleteStudent);

module.exports = router;
