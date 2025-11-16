const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/product.controller');

router.get('/', productoCtrl.getProductos);
router.post('/', productoCtrl.createProductos);
router.get('/:id', productoCtrl.getUnicoProducto);
router.put('/:id',productoCtrl.editarProducto);
router.delete('/:id', productoCtrl.eliminarProducto);

module.exports = router;