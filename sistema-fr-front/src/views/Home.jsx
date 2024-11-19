import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

// Imgs
import logo from "../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Título */}
      <div className="flex flex-col items-center gap-2">
        <img src={logo} className="w-36" />
      <h1 className="text-3xl font-bold text-center mb-8">
        College Student Grade Registration System The | FR System
      </h1>
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-4">
        <Button className="w-56" color="blue" onClick={() => navigate("/students")}>
          Registro de Estudiantes
        </Button>
        <Button className="w-56" color="blue" onClick={() => navigate("/grades")}>
          Registro de Calificaciones
        </Button>
        <Button className="w-56" color="blue" onClick={() => navigate("/tables")}>
          Ver Tablas
        </Button>
        <Button className="w-56" color="blue" onClick={() => navigate("/login")}>
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Home;
