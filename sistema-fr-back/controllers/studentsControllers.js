// controllers/studentsController.js
const Student = require('../models/Student');

// Obtener todos los estudiantes
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
};

// Obtener un estudiante por matrícula
const getStudentsByMatricula = async (req, res) => {
  const { matricula } = req.params;
  try {
    const student
      = await Student.findOne({ matricula });
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json(student);
  }
  catch (error) {
    res.status(500).json({ message: 'Error al obtener el estudiante', error });
  }
};

// Crear un nuevo estudiante
const createStudent = async (req, res) => {
  const { matricula, nombre, carrera, correo } = req.body;
  console.log("createStudent", req.body);
  try {
    // Verificar si el estudiante con la misma matrícula ya existe
    const existingStudent = await Student.findOne({ matricula });
    if (existingStudent) {
      return res.status(400).json({ message: 'La matrícula ya está registrada.' });
    }

    // Crear un nuevo estudiante
    const newStudent = new Student({ matricula, nombre, carrera, correo });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el estudiante', error });
  }
};

// Editar un estudiante
const updateStudent = async (req, res) => {
  const { matricula } = req.params;
  const { nombre, carrera, correo } = req.body;
  console.log("updateStudent", matricula, req.body);
  try {
    const student = await Student
      .findOneAndUpdate({ matricula }, { nombre, carrera, correo }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json(student);
  }
  catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estudiante', error });
  }
}

// Eliminar un estudiante
const deleteStudent = async (req, res) => {
  const { matricula } = req.params;
  console.log("deleteStudent", matricula);
  try {
    const student
      = await Student.findOneAndDelete
        ({ matricula });
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.status(200).json(student);
  }
  catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estudiante', error });
  }
};

module.exports = { getStudents, createStudent, updateStudent, deleteStudent, getStudentsByMatricula };
