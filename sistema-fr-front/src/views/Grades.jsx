import { useState } from "react";
import { Label, TextInput, Button, Card, Table } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Imgs
import logo from "../assets/logo.png";

const Grades = () => {
  const navigate = useNavigate();

  const [matricula, setMatricula] = useState("");
  const [calificacionFundamental, setCalificacionFundamental] = useState("");
  const [calificacionOrdinario, setCalificacionOrdinario] = useState("");
  const [calificacionMedioCurso, setCalificacionMedioCurso] = useState("");
  const [grupo, setGrupo] = useState("");
  const [materia, setMateria] = useState("");
  const [grades, setGrades] = useState([]);
  const [weights, setWeights] = useState({
    fundamental: 0.4,
    ordinario: 0.3,
    medioCurso: 0.3,
  });

  const handleRegisterGrades = (e) => {
    e.preventDefault();
    const average =
      calificacionFundamental * weights.fundamental +
      calificacionOrdinario * weights.ordinario +
      calificacionMedioCurso * weights.medioCurso;

    const newGrade = {
      matricula,
      calificacionFundamental,
      calificacionOrdinario,
      calificacionMedioCurso,
      grupo,
      materia,
      promedio: average.toFixed(2),
    };

    setGrades([...grades, newGrade]);

    Swal.fire({
      icon: "success",
      title: "Calificaciones Registradas",
      text: `Promedio calculado: ${average.toFixed(2)}`,
      confirmButtonText: "Aceptar",
    });

    // Resetear campos
    setMatricula("");
    setCalificacionFundamental("");
    setCalificacionOrdinario("");
    setCalificacionMedioCurso("");
    setGrupo("");
    setMateria("");
  };

  // Función para retroalimentar a un alumno y enviar un mensaje, y enviar un correo electrónico
  const retroalimentar = (index) => {
    const grade = grades[index];
    console.log(grade);
    Swal.fire({
      title: `Retroalimentación para el alumno ${grade.matricula}`,
      input: "textarea",
      inputLabel: "Mensaje",
      inputPlaceholder: "Escribe tu retroalimentación aquí...",
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar correo electrónico
        Swal.fire({
          icon: "success",
          title: "Enviando retroalimentación...",
          text: `Mensaje: ${result.value}`,
          confirmButtonText: "Aceptar",
        });

        // Nombre, Matricula, fundamental, ordinario, medio curso, promedio

        let student = {
          nombre: "Nombre del Alumno",
          correo: "santillano7479@gmail.com",
        };

        let structureGrade = `
          Nombre: ${student.nombre}
          Matrícula: ${grade.matricula}

          Calificaciones finales (${grade.materia}) \n
          -------------------------------------
          | Tipo de Evaluación
          -------------------------------------
          | ° Fundamental (${grade.calificacionFundamental})
          | ° Ordinario (${grade.calificacionOrdinario})
          | ° Medio Curso (${grade.calificacionMedioCurso})
          -------------------------------------
          | Promedio: ${grade.promedio}
          _____________________________________
          | Retroalimentación: ${result.value}
          _____________________________________
          | Calificaciones generadas por Sistema FR. (2024)
          -------------------------------------
          `;

        let mailtoLink = `mailto:${
          student.correo
        }?subject=Retroalimentación&body=${encodeURIComponent(structureGrade)}`;

        window.open(mailtoLink);
      }
    });
  };

  const handleWeightsChange = (field, value) => {
    const newWeights = { ...weights, [field]: parseFloat(value) };
    const total = Object.values(newWeights).reduce((a, b) => a + b, 0);
    if (total <= 1) {
      setWeights(newWeights);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La suma de los porcentajes no puede ser mayor a 100%.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 h-screen">
      {/* Formulario de Registro de Calificaciones */}
      <Card className="w-full md:w-1/2 shadow-lg">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-12" />
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Registro de Calificaciones
          </h1>
        </div>
        <form onSubmit={handleRegisterGrades} className="space-y-4">
          <Label htmlFor="matricula" value="Matrícula del Alumno" />
          <TextInput
            id="matricula"
            type="text"
            placeholder="Ingresa la matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
          <Label
            htmlFor="calificacionFundamental"
            value="Calificación Fundamental"
          />
          <TextInput
            id="calificacionFundamental"
            type="number"
            placeholder="Calificación Fundamental"
            value={calificacionFundamental}
            onChange={(e) => setCalificacionFundamental(e.target.value)}
            required
          />
          <Label
            htmlFor="calificacionOrdinario"
            value="Calificación Ordinario"
          />
          <TextInput
            id="calificacionOrdinario"
            type="number"
            placeholder="Calificación Ordinario"
            value={calificacionOrdinario}
            onChange={(e) => setCalificacionOrdinario(e.target.value)}
            required
          />
          <Label
            htmlFor="calificacionMedioCurso"
            value="Calificación Medio Curso"
          />
          <TextInput
            id="calificacionMedioCurso"
            type="number"
            placeholder="Calificación Medio Curso"
            value={calificacionMedioCurso}
            onChange={(e) => setCalificacionMedioCurso(e.target.value)}
            required
          />
          <Label htmlFor="grupo" value="Grupo" />
          <TextInput
            id="grupo"
            type="text"
            placeholder="Grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
          />
          <Label htmlFor="materia" value="Materia" />
          <TextInput
            id="materia"
            type="text"
            placeholder="Materia"
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
          />

          <div className="flex gap-2">
            <Button type="submit" className="w-full" color="blue">
              Registrar Calificaciones
            </Button>
            {/* Botón para regresar al inicio */}
            <Button
              className="w-full bg-gray-400 hover:bg-gray-500"
              onClick={() => navigate("/home")} // Redirige al inicio
            >
              Regresar al Inicio
            </Button>
          </div>
        </form>
      </Card>

      {/* Tabla y Configuración de Porcentajes */}
      <div className="w-full md:w-1/2">
        <Card className="mb-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Configurar Porcentajes</h2>
          <div className="space-y-2">
            <Label htmlFor="weightFundamental" value="Fundamental (%)" />
            <TextInput
              id="weightFundamental"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={weights.fundamental}
              onChange={(e) =>
                handleWeightsChange("fundamental", e.target.value)
              }
            />
            <Label htmlFor="weightOrdinario" value="Ordinario (%)" />
            <TextInput
              id="weightOrdinario"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={weights.ordinario}
              onChange={(e) => handleWeightsChange("ordinario", e.target.value)}
            />
            <Label htmlFor="weightMedioCurso" value="Medio Curso (%)" />
            <TextInput
              id="weightMedioCurso"
              type="number"
              min="0"
              max="1"
              step="0.01"
              value={weights.medioCurso}
              onChange={(e) =>
                handleWeightsChange("medioCurso", e.target.value)
              }
            />
          </div>
        </Card>

        <Card className="shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Calificaciones Registradas
          </h2>
          <div className="overflow-x-auto overflow-y-auto h-48">
            <Table>
              <Table.Head>
                <Table.HeadCell>Matrícula</Table.HeadCell>
                <Table.HeadCell>Materia</Table.HeadCell>
                <Table.HeadCell>Fundamental</Table.HeadCell>
                <Table.HeadCell>Ordinario</Table.HeadCell>
                <Table.HeadCell>Medio Curso</Table.HeadCell>
                <Table.HeadCell>Promedio</Table.HeadCell>
                <Table.HeadCell>Retroalimentación</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {grades.length > 0 ? (
                  grades.map((grade, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{grade.matricula}</Table.Cell>
                      <Table.Cell>{grade.materia}</Table.Cell>
                      <Table.Cell>{grade.calificacionFundamental}</Table.Cell>
                      <Table.Cell>{grade.calificacionOrdinario}</Table.Cell>
                      <Table.Cell>{grade.calificacionMedioCurso}</Table.Cell>
                      <Table.Cell>{grade.promedio}</Table.Cell>
                      <Table.Cell>
                        <Button
                          color="blue"
                          size="sm"
                          onClick={() => retroalimentar(index)}
                        >
                          Retroalimentar
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell colSpan="5" className="text-center">
                      No hay calificaciones registradas.
                    </Table.Cell>
                  </Table.Row>
                )}
                <div className="overflow-y-auto h-48"></div>
              </Table.Body>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Grades;