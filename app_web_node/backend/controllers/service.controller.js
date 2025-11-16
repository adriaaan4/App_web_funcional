const Servicio = require('../models/service');
const servicioCtrl = {};

servicioCtrl.getServicios = async (req, res) => {
    const servicios = await Servicio.find();
    res.json(servicios);
}

// Crear servicios
servicioCtrl.createServicios = async (req, res) => {
    const servicio = new Servicio(req.body);
    await servicio.save();
    res.json({
        'status': 'Servicio guardado'
    });

}

//Conseguir un único servicio
servicioCtrl.getUnicoServicio = async (req, res) => {
    const servicioUnico = await Servicio.findById(req.params.id);

    res.json(servicioUnico);
}

//Actualizar servicio
servicioCtrl.editarServicio = async (req, res) => {
    const { id } = req.params;
    const serviceEdit = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description
    };

    await Servicio.findByIdAndUpdate(id, {$set: serviceEdit}, {new: true});
    res.json({status: 'Servicio Actualizado'});
}

// Eliminar servicio
servicioCtrl.eliminarServicio = async (req, res) => {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({status: 'Servicio Eliminado'});
}

//exporto el módulo
module.exports = servicioCtrl;