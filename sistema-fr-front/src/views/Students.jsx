import { useEffect, useState } from "react";
import { Label, TextInput, Button, Card, Table } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Imágenes
import logo from "../assets/logo.png";

const Students = () => {
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [correo, setCorreo] = useState("");
  const [students, setStudents] = useState([]); // Lista de estudiantes
  const [editingIndex, setEditingIndex] = useState(null); // Índice del estudiante en edición

  const navigate = useNavigate();

  // URL de la API
  const API_URL = import.meta.env.VITE_STUDENT_URL;

  // Obtener todos los estudiantes al cargar la página
  useEffect(() => {
    getStudents();
  }, []);

  // Obtener todos los estudiantes
  const getStudents = () => {
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los estudiantes");
        }
        return response.json(); // Asegúrate de convertir la respuesta a JSON
      })
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  };

  // Validar y registrar un nuevo estudiante
  const handleRegister = (e) => {
    e.preventDefault();

    if (!matricula || !nombre || !carrera || !correo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (editingIndex !== null) {
      // Editar estudiante existente

      // Obtener la matrícula del estudiante a editar
      const student = students[editingIndex];
      const matricula = student.matricula;

      fetch(`${API_URL}/${matricula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, carrera, correo }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al actualizar el estudiante");
          }
          Swal.fire({
            icon: "success",
            title: "Edición Exitosa",
            text: `Estudiante ${nombre} actualizado correctamente.`,
            confirmButtonColor: "#3b82f6",
          });
          getStudents();
        })
        .catch((error) => console.error(error));
    } else {
      // Agregar nuevo estudiante a la base de datos
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricula, nombre, carrera, correo }),
      })
        .then((response) => {
          if (!response.ok) {
            // Mostramos el error que viene del backend de message
            Swal.fire({
              icon: "error",
              title: "Error",
              text:
                response.status === 400
                  ? "La matrícula ya está registrada."
                  : "Error al registrar el estudiante.",
              confirmButtonColor: "#3b82f6",
            });
            throw new Error("Error al registrar el estudiante");
          }

          Swal.fire({
            icon: "success",
            title: "Registro Exitoso",
            text: `Estudiante ${nombre} registrado correctamente.`,
            confirmButtonColor: "#3b82f6",
          });

          // Obtener todos los estudiantes
          getStudents();

          return response.json();
        })
        .catch((error) => console.error(error));
    }

    // Limpiar campos
    setMatricula("");
    setNombre("");
    setCarrera("");
    setCorreo("");
    setEditingIndex(null);
  };

  // Preparar para editar un estudiante
  const modeEdit = (index) => {
    const student = students[index];
    setMatricula(student.matricula);
    setNombre(student.nombre);
    setCarrera(student.carrera);
    setCorreo(student.correo);
    setEditingIndex(index);
  };

  // Eliminar un estudiante
  const handleDelete = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Obtener la matrícula del estudiante a eliminar
        
        const matricula = index;

        fetch(`${API_URL}/${matricula}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (!response.ok) {
            throw new Error("Error al eliminar el estudiante");
          }

          Swal.fire({
            icon: "success",
            title: "Eliminado",
            text: "El estudiante ha sido eliminado.",
            confirmButtonColor: "#3b82f6",
          });

          getStudents();
        });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-100 p-4 space-y-6 lg:space-y-0 lg:space-x-6 h-screen">
      {/* Formulario */}
      <div className="w-full lg:w-1/3">
        <Card>
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={logo} className="w-12" alt="Logo" />
              <h1 className="text-2xl font-semibold">Registro de Alumno</h1>
            </div>
            <form onSubmit={handleRegister} className="w-full space-y-4">
              <Label htmlFor="matricula">Matrícula</Label>
              <TextInput
                id="matricula"
                type="text"
                placeholder="Ingresa la matrícula"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />
              <Label htmlFor="nombre">Nombre</Label>
              <TextInput
                id="nombre"
                type="text"
                placeholder="Ingresa el nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <Label htmlFor="carrera">Carrera</Label>
              <select
                id="carrera"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
                className="block w-full mt-1 border border-gray-300 rounded-md"
              >
                <option value="">Selecciona una carrera</option>
                <option value="Sistemas Computacionales">
                  Sistemas Computacionales
                </option>
                <option value="Programación">Programación</option>
                <option value="Tecnicatura">Tecnicatura</option>
              </select>
              <Label htmlFor="correo">Correo</Label>
              <TextInput
                id="correo"
                type="email"
                placeholder="Ingresa el correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <Button type="submit" color="blue" className="w-full">
                {editingIndex !== null
                  ? "Actualizar Alumno"
                  : "Registrar Alumno"}
              </Button>
            </form>
            <Button
              className="w-full bg-gray-400 hover:bg-gray-500"
              onClick={() => navigate("/home")}
            >
              Regresar al Inicio
            </Button>
          </div>
        </Card>
      </div>

      {/* Tabla */}
      <div className="w-full lg:w-2/3 bg-white shadow-lg rounded-lg p-5 h-5/6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Estudiantes Registrados
        </h2>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Matrícula</Table.HeadCell>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Carrera</Table.HeadCell>
              <Table.HeadCell>Correo</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{student.matricula}</Table.Cell>
                    <Table.Cell>{student.nombre}</Table.Cell>
                    <Table.Cell>{student.carrera}</Table.Cell>
                    <Table.Cell>{student.correo}</Table.Cell>
                    <Table.Cell>
                      <div className="flex">
                        <Button
                          onClick={() => modeEdit(index)}
                          color="light"
                          className="mr-2"
                        >
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleDelete(student.matricula)}
                          color="failure"
                          className="mr-2"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="5" className="text-center">
                    No hay estudiantes registrados.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Students;
