// Importamos React y los hooks necesarios
import React, { useEffect, useState } from "react";

/**
 * Componente UserList
 * -----------------------
 * Muestra la lista de empleados obtenidos desde la API del backend.
 * Permite eliminar empleados y notificar al componente padre cuando se desea editar uno.
 *
 * Props:
 *  - onEdit: función callback que recibe el empleado seleccionado para editar.
 */
function UserList({ onEdit }) {
  // -------------------- ESTADO --------------------
  // users almacena el listado de empleados cargados desde la API.
  const [users, setUsers] = useState([]);

  // -------------------- FUNCIÓN DE CARGA --------------------
  // Esta función obtiene la lista completa de empleados desde el backend.
  const fetchUsers = () => {
    fetch("http://localhost:3000/api/mi_app_web/users")
      .then((res) => res.json()) // Convertimos la respuesta a JSON
      .then((data) => setUsers(data)) // Guardamos los empleados en el estado
      .catch((err) => console.error("Error:", err)); // Mostramos errores si ocurren
  };

  // -------------------- useEffect --------------------
  // Este efecto se ejecuta una sola vez al montar el componente ([] como dependencia vacía)
  // Llama a fetchUsers() para cargar los datos iniciales desde la API.
  useEffect(() => {
    fetchUsers();
  }, []);

  // -------------------- FUNCIÓN ELIMINAR --------------------
  // handleDelete recibe el ID del empleado a eliminar.
  // Pide confirmación al usuario y, si acepta, envía la solicitud DELETE al backend.
  const handleDelete = (id) => {
    // Confirmación para evitar eliminaciones accidentales
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    // Petición DELETE al servidor
    fetch(`http://localhost:3000/api/mi_app_web/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("Usuario eliminado"); // Mensaje de confirmación
        fetchUsers(); // Recargamos la lista para reflejar el cambio
      })
      .catch((err) => console.error("Error al eliminar:", err));
  };

  // -------------------- RENDERIZADO --------------------
  // Muestra un mensaje si no hay empleados o una tabla si existen registros.
  return (
    <div>
      <h2>Lista de Usuarios</h2>

      {/* Si no hay empleados, mostrar un mensaje */}
      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        // Si hay empleados, renderizamos una tabla HTML sencilla
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Oficina</th>
              <th>Posición</th>
              <th>Salario</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/* Recorremos el arreglo de empleados */}
            {users.map((emp) => (
              // Cada fila debe tener una key única (usamos emp._id o emp.id)
              <tr key={emp._id || emp.id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.office}</td>
                <td>{emp.position}</td>
                <td>${emp.salary}</td>
                <td>
                  {/* Si es admin, no permitir editar */}
                  {emp.email !== "admin@correo.com" ? (
                    <button onClick={() => onEdit(emp)}>Editar</button>
                  ) : (
                    <button disabled style={{ opacity: 0.5 }}>Editar</button>
                  )}

                  {/* Si es admin, no permitir eliminar */}
                  {emp.email !== "admin@correo.com" ? (
                    <button
                      onClick={() => handleDelete(emp._id || emp.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Eliminar
                    </button>
                  ) : (
                    <button disabled style={{ marginLeft: "10px", opacity: 0.5 }}>
                      Eliminar
                    </button>
                  )}
                </td>              
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Exportamos el componente para que pueda usarse en App.js u otros componentes
export default UserList;
