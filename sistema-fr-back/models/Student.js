// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  matricula: { type: String, required: true, unique: true },
  carrera: { type: String, required: true },
  correo: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
