const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
}

// Crear usuario / Register
usuarioCtrl.register = async (req, res) => {
  try {
    const { name, email, password, office, position, salary } = req.body;

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ message: 'El email ya está registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ name, email, password: hashedPassword, office, position, salary });
    await nuevoUsuario.save();

    res.json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

//Conseguir un único usuario
usuarioCtrl.getUnicoUsuario = async (req, res) => {
    const usuarioUnico = await Usuario.findById(req.params.id);

    res.json(usuarioUnico);
}

//Actualizar usuario
usuarioCtrl.editarUsuario = async (req, res) => {
    const { id } = req.params;
    const userEdit = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        office: req.body.office,
        position: req.body.position,
        salary: req.body.salary
    };

    await Usuario.findByIdAndUpdate(id, {$set: userEdit}, {new: true});
    res.json({status: 'Usuario Actualizado'});
}

// Eliminar usuario
usuarioCtrl.eliminarUsuario = async (req, res) => {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({status: 'Usuario Eliminado'});
}

// Login de usuario
usuarioCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({email});

    if (!usuario) return res.status(400).json({message: 'Usuario no encontrado'});

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return res.status(401).json({message: 'Contraseña incorrecta'});

    // Generar token JWT
    const token = jwt.sign(
      {id: usuario._id, email: usuario.email},
      'clave_segura',
      {expiresIn: '2h'}
    );

    res.json({message: 'Login exitoso', token});
  } catch (error) {
    res.status(500).json({message: 'Error al iniciar sesión', error});
  }
};


//exporto el módulo
module.exports = usuarioCtrl;