README – APP_WEB_FUNCIONAL
Descripción

APP_WEB_FUNCIONAL es una aplicación web completa dividida en dos partes:

Backend (Node.js + Express + MongoDB local)
Frontend (React + React Router)

Permite gestionar:
- Usuarios
- Productos
- Servicios
- Inicio de sesión con JWT
- Usuario administrador creado automáticamente al iniciar el servidor

-> Requisitos previos

Antes de ejecutar el proyecto se necesitan:

- Node.js (v16 o superior)
https://nodejs.org/

- MongoDB instalado localmente
Se usa la conexión por defecto:
mongodb://127.0.0.1:27017/mi_app_web

Instalación
1️. Clonar el repositorio
git clone https://github.com/TU_USUARIO/app_web_funcional.git

2. Entrar a la carpeta del backend
cd app_web_funcional/app_web_node

Instalar dependencias
npm install

3️. Entrar a la carpeta del frontend
cd ../app_web_react

Instalar dependencias
npm install

-> Cómo ejecutar el proyecto
1. Iniciar backend (Node.js + Express)

Desde:
app_web_node/

Ejecutar:
npm run dev

Esto:
Inicia el servidor en http://localhost:3000

Conecta con MongoDB local
Crea automáticamente el usuario admin si no existe
Correo: admin@correo.com
Contraseña: 123456

2. Iniciar frontend (React)
Desde:
app_web_react/

Ejecutar:
npm start

Esto inicia React en:
http://localhost:3001
Usuario administrador creado automáticamente
Cada vez que el backend se inicia, verifica si existe un usuario administrador.
Si no existe lo crea automáticamente:

Correo: admin@correo.com
Password: 123456

Este usuario no se puede eliminar ni editar.

Rutas principales
- Backend
Ruta	Método	Descripción
/api/mi_app_web/users	GET	Obtener usuarios
/api/mi_app_web/users/login	POST	Iniciar sesión
/api/mi_app_web/products	CRUD	Gestión de productos
/api/mi_app_web/services	CRUD	Gestión de servicios


-> Notas importantes
Asegúrate de que MongoDB esté corriendo antes de iniciar el backend.
El backend usa CORS configurado para permitir React en http://localhost:3001.
Si mueves React a otro puerto, cambia esta línea en app_web_node/index.js:
app.use(cors({ origin: 'http://localhost:3001' }));
