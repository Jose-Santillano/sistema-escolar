import { useState } from "react";
import { Button, Table } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Imgs
import logo from "../assets/logo.png";

const Tables = () => {
  const navigate = useNavigate();

  // Datos simulados de ejemplo
  const [grades, setGrades] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      matricula: "2012345",
      materia: "Matemáticas",
      fundamental: 8.5,
      ordinario: 9,
      medioCurso: 7.8,
      promedio: 8.43,
      subido: false,
    },
    {
      id: 2,
      nombre: "Ana López",
      matricula: "2016789",
      materia: "Física",
      fundamental: 9.2,
      ordinario: 8.8,
      medioCurso: 8.5,
      promedio: 8.83,
      subido: false,
    },
    {
      id: 2,
      nombre: "Ana López",
      matricula: "2016789",
      materia: "Física",
      fundamental: 9.2,
      ordinario: 8.8,
      medioCurso: 8.5,
      promedio: 8.83,
      subido: false,
    },
    {
      id: 2,
      nombre: "Ana López",
      matricula: "2016789",
      materia: "Física",
      fundamental: 9.2,
      ordinario: 8.8,
      medioCurso: 8.5,
      promedio: 8.83,
      subido: false,
    },
  ]);

  // Función para subir todas las calificaciones a SFR (simulación)
  const uploadAllGrades = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Subirás todas las calificaciones a SFR.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, subir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setGrades((prevGrades) =>
          prevGrades.map((grade) => ({ ...grade, subido: true }))
        );
        Swal.fire(
          "¡Subido!",
          "Todas las calificaciones han sido subidas.",
          "success"
        );
      }
    });
  };

  // Función para subir una calificación individual
  const uploadSingleGrade = (id) => {
    setGrades((prevGrades) =>
      prevGrades.map((grade) =>
        grade.id === id ? { ...grade, subido: true } : grade
      )
    );
    Swal.fire("¡Subido!", "Calificación subida al sistema.", "success");
  };

  // Función para eliminar un registro
  const deleteGrade = (id) => {
    setGrades((prevGrades) => prevGrades.filter((grade) => grade.id !== id));
    Swal.fire("Eliminado", "El registro ha sido eliminado.", "success");
  };

  // Función para editar un registro (simulación)
  const editGrade = (id) => {
    Swal.fire(
      "Edición no implementada",
      "Esta funcionalidad es un placeholder.",
      "info"
    );
  };

  return (
    <div className="bg-gray-100 h-screen p-5 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="flex items-center gap-2 mb-5">
          <img src={logo} className="w-12" />
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            Registro de Calificaciones
          </h1>
        </div>

        <div className="flex gap-2 items-center justify-center mb-4">
          <Button className="w-full" color="blue" onClick={uploadAllGrades}>
            Subir calificaciones a SFR
          </Button>
          <Button
            className="w-full bg-gray-400 hover:bg-gray-500"
            onClick={() => navigate("/home")}
          >
            Regresar al Inicio
          </Button>
        </div>

        {/* Tabla con Flowbite */}
        <div className="overflow-y-auto h-96">
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Matrícula</Table.HeadCell>
              <Table.HeadCell>Materia</Table.HeadCell>
              <Table.HeadCell>Fundamental</Table.HeadCell>
              <Table.HeadCell>Ordinario</Table.HeadCell>
              <Table.HeadCell>Medio Curso</Table.HeadCell>
              <Table.HeadCell>Promedio</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {grades.map((grade) => (
                <Table.Row key={grade.id} className="hover:bg-gray-100">
                  <Table.Cell>{grade.nombre}</Table.Cell>
                  <Table.Cell>{grade.matricula}</Table.Cell>
                  <Table.Cell>{grade.materia}</Table.Cell>
                  <Table.Cell>{grade.fundamental}</Table.Cell>
                  <Table.Cell>{grade.ordinario}</Table.Cell>
                  <Table.Cell>{grade.medioCurso}</Table.Cell>
                  <Table.Cell>{grade.promedio}</Table.Cell>
                  <Table.Cell>
                    <div className="flex">
                      <Button
                        onClick={() => uploadSingleGrade(grade.id)}
                        color="success"
                      >
                        Subir
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Tables;
