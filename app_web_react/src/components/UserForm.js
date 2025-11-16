// Importamos React y los hooks necesarios desde la biblioteca
import React, { useState, useEffect } from "react";
/**
 * Componente UserForm
 * -----------------------
 * Este componente se utiliza para crear o editar empleados.
 * Puede funcionar en dos modos:
 *  - Modo "crear": cuando no hay empleado seleccionado (userToEdit = null)
 *  - Modo "editar": cuando se recibe un empleado con sus datos
 *
 * Props:
 *  - userToEdit: objeto con los datos del empleado a editar (puede ser null)
 *  - onSaveComplete: función callback que se ejecuta cuando se guarda correctamente
 */
function UserForm({ userToEdit, onSaveComplete }) {

  // -------------------- ESTADOS --------------------
  // Cada campo del formulario tiene su propio estado local controlado.
  // Esto permite reflejar en tiempo real lo que el usuario escribe.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [office, setOffice] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");

  // -------------------- EFECTO DE SINCRONIZACIÓN --------------------
  // Este useEffect se ejecuta cada vez que cambia la prop userToEdit.
  // Si existe un empleado para editar, los campos se llenan con sus datos.
  // Si no existe (modo creación), se limpian los campos del formulario.
  useEffect(() => {
    if (userToEdit) {
      // Precargar datos del empleado seleccionado
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setPassword(userToEdit.password);
      setOffice(userToEdit.office);
      setPosition(userToEdit.position);
      setSalary(userToEdit.salary);
    } else {
      // Limpiar el formulario para crear uno nuevo
      setName("");
      setEmail("");
      setPassword("");
      setOffice("");
      setPosition("");
      setSalary("");
    }
  }, [userToEdit]); // Se vuelve a ejecutar si cambia userToEdit

  // -------------------- MANEJO DEL ENVÍO --------------------
  // Esta función controla lo que ocurre al enviar el formulario.
  // Se encarga de crear o actualizar el empleado según corresponda.
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página por defecto.

    // Construimos un objeto con los datos del formulario
    const newUser = { name, email, password, office, position,  salary };

    // Determinamos si el formulario está en modo edición o creación
    const method = userToEdit ? "PUT" : "POST";
    const url = userToEdit
      ? `http://localhost:3000/api/mi_app_web/users/${userToEdit._id}` // Actualizar
      : "http://localhost:3000/api/mi_app_web/users"; // Crear nuevo

    // -------------------- PETICIÓN FETCH --------------------
    // Enviamos los datos al backend (Node.js / Express)
    fetch(url, {
      method, // PUT o POST según el caso
      headers: { "Content-Type": "application/json" }, // Indicamos que el cuerpo es JSON
      body: JSON.stringify(newUser), // Convertimos el objeto a texto JSON
    })
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then(() => {
        // Mostramos un mensaje al usuario
        alert(
          userToEdit
            ? `Usuario ${name} actualizado`
            : `Usuario ${name} creado`
        );

        // Notificamos al componente padre (por ejemplo, para refrescar la lista de empleados)
        onSaveComplete();
      })
      .catch((err) => console.error("Error:", err)); // Captura y muestra errores en consola
  };

  // -------------------- RENDERIZADO DEL FORMULARIO --------------------
  // Se muestran los campos de entrada controlados y un botón dinámico.
  // El texto del botón y el título cambian según si se está creando o editando un empleado.
  return (
    <form onSubmit={handleSubmit}>
      {/* Título dinámico del formulario */}
      <h2>{userToEdit ? "Editar Usuario" : "Agregar Usuario"}</h2>

      {/* Campo de texto: Nombre */}
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* Campo de texto: Email */}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Campo de texto: Password */}
      <input
        type="text"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Campo de texto: Oficina */}
      <input
        type="text"
        placeholder="Oficina"
        value={office}
        onChange={(e) => setOffice(e.target.value)}
        required
      />


      {/* Campo de texto: Posición */}
      <input
        type="text"
        placeholder="Posición"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />


      {/* Campo numérico: Salario */}
      <input
        type="number"
        placeholder="Salario"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />

      {/* Botón dinámico (cambia texto según acción) */}
      <button type="submit">
        {userToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

// Exportamos el componente para que pueda ser importado en otros archivos
export default UserForm;
