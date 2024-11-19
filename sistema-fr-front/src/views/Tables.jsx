import { useEffect, useState } from "react";
import { Button, Label, Table } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Imgs
import logo from "../assets/logo.png";

const Tables = () => {
  const API_URL = import.meta.env.VITE_GRADE_URL;

  const navigate = useNavigate();

  const [allGrades, setAllGrades] = useState([]); // Datos originales
  const [grades, setGrades] = useState([]); // Datos mostrados
  const [groupOptions, setGroupOptions] = useState([]); // Opciones de grupo

  // Obtener datos de la API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setAllGrades(data);
        setGrades(data);
        const groups = Array.from(new Set(data.map((grade) => grade.grupo)));
        setGroupOptions(groups);
      });
  }, []);

  // Filtrar las calificaciones por grupo
  const filterGroups = (grupo) => {
    if (grupo === "all") {
      setGrades(allGrades); // Mostrar todos los datos
    } else {
      console.log("Todos los datos:", allGrades);
      const filtered = allGrades.filter((grade) => {
        console.log(`grade.grupo (type: ${typeof grade.grupo}):`, grade.grupo);
        console.log(`grupo (type: ${typeof grupo}):`, grupo);
        console.log(
          "Comparación:",
          String(grade.grupo).trim() === String(grupo).trim()
        );
        return String(grade.grupo).trim() === String(grupo).trim();
      });
      console.log("Filtrado:", filtered);
      setGrades(filtered);
    }
  };

  // Subir todas las calificaciones
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

  // Subir una calificación individual
  const uploadSingleGrade = (id) => {
    setGrades((prevGrades) =>
      prevGrades.map((grade) =>
        grade.id === id ? { ...grade, subido: true } : grade
      )
    );
    Swal.fire("¡Subido!", "Calificación subida al sistema.", "success");
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

        <div className="flex gap-2 items-center justify-center mb-4">
          <div className="flex gap-3 items-center">
            <Label>Grupo:</Label>
            <select
              className="p-2 rounded-lg border border-gray-300"
              onChange={(e) => filterGroups(e.target.value)}
            >
              <option value="all">Todos los grupos</option>
              {groupOptions.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla con Flowbite */}
        <div className="overflow-y-auto h-96">
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Matrícula</Table.HeadCell>
              <Table.HeadCell>Materia</Table.HeadCell>
              <Table.HeadCell>Grupo</Table.HeadCell>
              <Table.HeadCell>Fundamental</Table.HeadCell>
              <Table.HeadCell>Ordinario</Table.HeadCell>
              <Table.HeadCell>Medio Curso</Table.HeadCell>
              <Table.HeadCell>Promedio</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {grades.map((grade, index) => (
                <Table.Row key={index} className="hover:bg-gray-100">
                  <Table.Cell>{grade.matricula}</Table.Cell>
                  <Table.Cell>{grade.materia}</Table.Cell>
                  <Table.Cell>{grade.grupo}</Table.Cell>
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
