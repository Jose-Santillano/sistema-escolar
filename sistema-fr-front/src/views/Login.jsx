import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Card } from "flowbite-react";
import Swal from "sweetalert2";

// Imgs
import logo from "../assets/logo.png";

const Login = () => {
  const [matricula, setMatricula] = useState("");
  const [password, setPassword] = useState("");

  // Credenciales de inicio de sesión
  const envUser = import.meta.env.VITE_LOGIN_USER || "1234567";
  const envPassword = import.meta.env.VITE_PASSWORD_USER || "12345678";

  // Navegación
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("envUser", envUser);
    console.log("envPassword", envPassword);

    // Validación de matrícula (7 números) y contraseña (mínimo 8 caracteres)
    const matriculaRegex = /^\d{7}$/;
    if (!matriculaRegex.test(matricula)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La matrícula debe tener exactamente 7 números.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#3b82f6",
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La contraseña debe tener al menos 8 caracteres.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#3b82f6",
      });
    } else if (matricula === envUser && password === envPassword) {
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Inicio de sesión exitoso.",
        confirmButtonText: "Continuar",
        confirmButtonColor: "#3b82f6",
      }).then(() => {
        // Redirección a la página de inicio
        navigate("/home");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Matrícula o contraseña incorrecta.",
        confirmButtonText: "Reintentar",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-400"
      style={{
        backgroundImage: "url('/fondo-login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: "0.9",
      }}
    >
      <Card className="w-96">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold text-center">Sistema FR</h1>
          <img src={logo} className="w-36" />
          <h2 className="text-md font-bold text-center mt-4">Iniciar Sesión</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Label htmlFor="matricula" value="Matrícula" />
            <TextInput
              id="matricula"
              type="text"
              placeholder="Ingresa tu matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="password" value="Contraseña" />
            <TextInput
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" color="blue">
            Iniciar Sesión
          </Button>
        </form>
        <div className="mt-2">
          <p className="text-center text-xs">
            Si eres estudiante, debes ingresar a través del portal de la{" "}
            <span className="text-[#0d73b8]">
            Servicios
            en Línea de FR
            </span>
            .
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
