
# React CRUD Empleados — Frontend + API

Una aplicación **React** para gestionar empleados (CRUD: Crear, Listar, Editar, Eliminar) conectada a una **API REST** (por defecto en `http://localhost:3000`). Incluye guía paso a paso, explicación de conceptos de React, estructura del proyecto, configuración de CORS/proxy, y buenas prácticas para desarrollo.

---

## 🧠 ¿Qué es React?

**React** es una **biblioteca de JavaScript** para construir **interfaces de usuario** (UIs) de forma **declarativa**, **componente‑basada** y **reactiva**.

- **Declarativa**: describes *qué* quieres ver en pantalla (JSX), y React se encarga de actualizar eficientemente el DOM cuando cambian los datos.
- **Basada en componentes**: la UI se compone de **componentes** reutilizables (p. ej., `EmployeeForm`, `EmployeeList`) que encapsulan vista + lógica + estilo.
- **Reactiva**: los **estados** (`useState`) y **efectos** (`useEffect`) permiten que la UI se actualice automáticamente cuando cambia la información.

### Conceptos clave de React
- **JSX**: sintaxis que mezcla JavaScript + XML (parecido a HTML) para describir la UI.
- **Props**: datos que fluyen de padre a hijo (`<EmployeeList onEdit={...} />`).
- **State**: datos internos del componente; cambiar el estado re‑renderiza ese componente.
- **Hooks**: funciones especiales (p. ej., `useState`, `useEffect`) para manejar estado, efectos, refs, contexto, etc.
- **SPA**: *Single Page Application* — la navegación y actualizaciones ocurren sin recargar toda la página.

> En esta app usarás `useState` para formularios y `useEffect` para cargar datos desde la API.

---

## 🚀 Características de la app

- **Listado** de empleados en tabla con acciones.
- **Creación** de empleado desde formulario.
- **Edición** usando el mismo formulario.
- **Eliminación** con confirmación.
- **Estilos** sencillos CSS.
- Listo para desarrollo local con API en **`http://localhost:3000`** y frontend en **`http://localhost:3001`** 

---

## 🗂️ Estructura sugerida del proyecto

```
frontend/                # App React (create-react-app)
  src/
    components/
      EmployeeForm.js
      EmployeeList.js
    App.js
    index.js
  package.json
  README.md (este archivo)
backend/                 # Tu API Node.js/Express (no incluida)
  server.js
  routes/empleados.js
```

> Puedes mantener `backend` y `frontend` en repos separados o en el mismo monorepo.

---

## 🔧 Requisitos

- **Node.js 18+** (y npm 9+)
- Una **API REST** disponible (por defecto en `http://localhost:3000`) con endpoints:
  - `GET /api/empleados`
  - `POST /api/empleados`
  - `PUT /api/empleados/:id`
  - `DELETE /api/empleados/:id`

### Ejemplo mínimo de API (Node.js + Express)

```js
// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" })); // Ajusta el origen del frontend

let empleados = [];

app.get("/api/empleados", (req, res) => res.json(empleados));

app.post("/api/empleados", (req, res) => {
  const emp = { ...req.body, _id: crypto.randomUUID() };
  empleados.push(emp);
  res.json(emp);
});

app.put("/api/empleados/:id", (req, res) => {
  const { id } = req.params;
  empleados = empleados.map(e => (e._id === id ? { ...e, ...req.body } : e));
  res.json(empleados.find(e => e._id === id));
});

app.delete("/api/empleados/:id", (req, res) => {
  const { id } = req.params;
  empleados = empleados.filter(e => e._id !== id);
  res.json({ ok: true });
});

app.listen(3000, () => console.log("API on http://localhost:3000"));
```

---

## 🛠️ Instalación y ejecución (frontend)

```bash
# 1) Crear el proyecto (si aún no lo tienes)
npx create-react-app frontend
cd frontend

# 2) Instalar dependencias opcionales
npm install bootstrap

# 3) Ejecutar en puerto 3001 (Windows CMD/PowerShell)
set PORT=3001 && npm start

#    macOS/Linux
# PORT=3001 npm start
```

- Frontend: `http://localhost:3001`
- Backend/API: `http://localhost:3000`


> **Nota**: si frontend y backend están en **puertos diferentes** (recomendado), activa **CORS** en el backend (ver ejemplo arriba).

---


## 🧩 Componentes principales

### `EmployeeForm.js` (crear/editar)

- Maneja **estado local** de los inputs (`name`, `position`, `office`, `salary`).
- Si recibe `employeeToEdit` (prop), **rellena el formulario** para editar y usa `PUT`.
- Si no hay `employeeToEdit`, crea con `POST`.
- Notifica a `App` con `onSaveComplete()` para refrescar la lista o limpiar selección.

**Pseudocódigo**:
```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const payload = { name, position, office, salary };
  const method = employeeToEdit ? "PUT" : "POST";
  const url = employeeToEdit
    ? `${API}/api/empleados/${employeeToEdit._id}`
    : `${API}/api/empleados`;

  fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    .then(r => r.json())
    .then(onSaveComplete);
};
```

### `EmployeeList.js` (listar/editar/eliminar)

- Carga empleados con `useEffect` → `GET /api/empleados`.
- Muestra tabla con acciones **Editar** y **Eliminar**.
- `Eliminar` dispara `DELETE /api/empleados/:id` y vuelve a cargar la lista.

**Pseudocódigo**:
```jsx
useEffect(() => { fetch(`${API}/api/empleados`).then(r => r.json()).then(setEmployees); }, []);

const handleDelete = (id) => {
  if (!window.confirm("¿Eliminar?")) return;
  fetch(`${API}/api/empleados/${id}`, { method: "DELETE" }).then(fetchEmployees);
};
```

### `App.js` (orquestación)

- Mantiene `selectedEmployee` en estado.
- Pasa `employeeToEdit` al formulario y `onEdit` a la lista.
- Define `handleSaveComplete` para limpiar selección y/o refrescar listado.

---

## 🎨 Estilos (sugerencias rápidas)

- **Bootstrap**: importar en `src/index.js`:
  ```js
  import "bootstrap/dist/css/bootstrap.min.css";
  ```

- En `App.js` usar contenedores/clases:
  ```jsx
  <div className="container mt-4">
    <h1 className="text-center mb-4">Gestión de Empleados</h1>
    <EmployeeForm ... />
    <EmployeeList ... />
  </div>
  ```

- Botones sugeridos:
  - Crear/Actualizar → `btn btn-primary w-100`
  - Editar → `btn btn-warning btn-sm`
  - Eliminar → `btn btn-danger btn-sm`

---


## 🧩 Scripts útiles (frontend)

- `npm start` — ejecuta en modo desarrollo.

---


## 📄 Licencia

Este proyecto puede usarse con fines educativos y comerciales.

---

## ✍️ Autoría y créditos

- **Frontend**: React + Hooks + Fetch API
- **UI**: Bootstrap (opcional)
- **API**: Node.js + Express (ejemplo)

> Sugerencias, mejoras y PRs son bienvenidos. ¡Feliz código! 👩‍💻👨‍💻
