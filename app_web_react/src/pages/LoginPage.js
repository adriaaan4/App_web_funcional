import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLogged }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/mi_app_web/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("token", data.token);

        // Notificar al App.js que está logueado
        setIsLogged(true);

        // Redirigir a Usuarios
        navigate("/users");

      } else {
        alert(data.message || "Credenciales incorrectas");
      }

    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Iniciar sesión</h2>

      <input
        type="email"
        placeholder="admin@correo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="123456"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px" }}
      />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
}