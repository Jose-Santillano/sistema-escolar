// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  nombre: { type: String, },
  matricula: { type: String, unique: true },
  carrera: { type: String, },
  correo: { type: String,  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
