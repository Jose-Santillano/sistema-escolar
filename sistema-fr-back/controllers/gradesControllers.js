// controllers/gradesController.js
const Grade = require("../models/Grade");
const Student = require("../models/Student");

// Obtener calificaciones de todos los estudiantes
const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find(); // Obtiene todas las calificaciones
    const populatedGrades = await Promise.all(
      grades.map(async (grade) => {
        const student = await Student.findOne({ matricula: grade.matricula });
        return {
          ...grade.toObject(),
          student, // Agrega los datos del estudiante relacionado
        };
      })
    );

    res.status(200).json(populatedGrades);
  } catch (error) {
    console.error("getGrades error", error);
    res.status(500).json({ message: "Error al obtener calificaciones" });
  }
};

// Crear una nueva calificación
const createGrade = async (req, res) => {
  const {
    matricula,
    fundamental,
    ordinario,
    medioCurso,
    grupo,
    materia,
    promedio,
  } = req.body;

  console.log("createGrade", req.body);

  try {
    // Buscar al estudiante por su matrícula
    const student = await Student.findOne({ matricula });
    if (!student) {
      return res
        .status(404)
        .json({ message: "La matrícula no existe en el sistema." });
    }

    // Crear la nueva calificación
    const newGrade = new Grade({
      matricula,
      fundamental,
      ordinario,
      medioCurso,
      grupo,
      materia,
      promedio,
    });
    await newGrade.save();

    // Responder con el nombre y el correo del estudiante
    res.status(201).json({
      nombre: student.nombre,
      correo: student.correo,
    });
  } catch (error) {
    console.log("createGrade error", error);
    res.status(400).json({ message: "Error al crear la calificación" });
  }
};

module.exports = { getGrades, createGrade };
