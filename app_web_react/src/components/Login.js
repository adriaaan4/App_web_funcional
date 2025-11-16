import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/mi_app_web/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error al iniciar sesión");
        return;
      }

      // Guardamos el token en localStorage
      localStorage.setItem("token", data.token);

      alert("Login exitoso");

      // Notificamos al padre
      onLogin(data.token);

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <form onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "250px", gap: "10px" }}>
      
      <h2>Iniciar Sesión</h2>

      <input
        type="text"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Ingresar</button>
    </form>
  );
}
