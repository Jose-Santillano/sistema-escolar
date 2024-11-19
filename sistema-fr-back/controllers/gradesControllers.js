// controllers/gradesController.js
const Grade = require('../models/Grade');
const Student = require('../models/Student');

// Obtener calificaciones de todos los estudiantes
const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('studentId');
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener calificaciones' });
  }
};

// Crear una nueva calificación
const createGrade = async (req, res) => {
  const { studentId, fundamental, ordinario, medioCurso, grupo, materia, promedio } = req.body;
  try {
    const newGrade = new Grade({ studentId, fundamental, ordinario, medioCurso, grupo, materia, promedio });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la calificación' });
  }
};

module.exports = { getGrades, createGrade };
