const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/user.controller');

router.get('/', usuarioCtrl.getUsuarios);
router.post('/login', usuarioCtrl.login)
router.post('/', usuarioCtrl.register);
router.get('/:id', usuarioCtrl.getUnicoUsuario);
router.put('/:id', usuarioCtrl.editarUsuario);
router.delete('/:id', usuarioCtrl.eliminarUsuario);


module.exports = router;