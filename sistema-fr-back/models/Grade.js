// models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  matricula: { type: String, ref: 'Student', required: true }, // Cambiado a String
  fundamental: { type: Number },
  ordinario: { type: Number },
  medioCurso: { type: Number },
  grupo: { type: Number },
  materia: { type: String },
  promedio: { type: Number },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
