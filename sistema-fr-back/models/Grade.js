// models/Grade.js
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fundamental: { type: Number, required: true },
  ordinario: { type: Number, required: true },
  medioCurso: { type: Number, required: true },
  grupo: { type: Number, required: true },
  materia: { type: String, required: true },
  promedio: { type: Number, required: true },
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
