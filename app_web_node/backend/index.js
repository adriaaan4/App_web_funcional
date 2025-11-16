const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('./database');

const Usuario = require("./models/user");
const bcrypt = require("bcryptjs");

async function crearAdminSiNoExiste() {
  try {
    const adminEmail = "admin@correo.com";
    const existe = await Usuario.findOne({ email: adminEmail });

    if (existe) {
      console.log("admin ya existe");
      return;
    }

    // 🔒 Encriptar la contraseña del admin
    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new Usuario({
      name: "admin",
      email: "admin@correo.com",
      password: hashedPassword,   // <-- CONTRASEÑA ENCRIPTADA
      office: "oficina 1",
      position: "admin",
      salary: 0
    });

    await admin.save();

    console.log("Usuario admin creado");

  } catch (error) {
    console.error("Error creando admin:", error);
  }
}
// EJECUTAR LA FUNCIÓN
crearAdminSiNoExiste();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001' }));

// Rutas
app.use('/api/mi_app_web/users', require('./routes/user.routes'));
app.use('/api/mi_app_web/products', require('./routes/product.routes'));
app.use('/api/mi_app_web/services', require('./routes/service.routes'));

// Iniciando el servidor
app.listen(app.get('port'), () => {
  console.log('server activo en el puerto', app.get('port'));
});