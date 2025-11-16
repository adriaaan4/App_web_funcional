import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage";
import ProductPage from "./pages/ProductPage";
import ServicePage from "./pages/ServicePage";
import LoginPage from "./pages/LoginPage";
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {

  // 1️⃣ Estado que controla si hay sesión
  const [isLogged, setIsLogged] = useState(() => {
    const token = localStorage.getItem("token");
    return token && token !== "null" && token !== "undefined";
  });

  // 2️⃣ Limpia tokens inválidos al iniciar la app
useEffect(() => {
  localStorage.removeItem("token");
}, []);

  // 3️⃣ Aquí ya va tu return original
  return (
    <Router>

      {isLogged && (
        <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/users">Usuarios</Link>
          <Link to="/products">Productos</Link>
          <Link to="/services">Servicios</Link>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage setIsLogged={setIsLogged} />} />

        <Route path="/users" element={<UserPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/services" element={<ServicePage />} />


        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    
  );
}