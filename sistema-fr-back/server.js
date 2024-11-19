// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentsRoutes = require('./routes/studentsRoutes');
const gradesRoutes = require('./routes/gradesRoutes');

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/students', studentsRoutes);
app.use('/api/grades', gradesRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
