const Producto = require('../models/product');
const productoCtrl = {};

productoCtrl.getProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
}

// Crear productos
productoCtrl.createProductos = async (req, res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        'status': 'Producto guardado'
    });

}

//Conseguir un único producto
productoCtrl.getUnicoProducto = async (req, res) => {
    const productoUnico = await Producto.findById(req.params.id);

    res.json(productoUnico);
}

//Actualizar producto
productoCtrl.editarProducto = async (req, res) => {
    const { id } = req.params;
    const productEdit = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.stock
    };

    await Producto.findByIdAndUpdate(id, {$set: productEdit}, {new: true});
    res.json({status: 'Producto Actualizado'});
}

// Eliminar producto
productoCtrl.eliminarProducto = async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({status: 'Producto Eliminado'});
}

//exporto el módulo
module.exports = productoCtrl;