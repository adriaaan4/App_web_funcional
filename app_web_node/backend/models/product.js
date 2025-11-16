const mongoose = require('mongoose');
const {Schema} = mongoose;
const ProductoSchema = new Schema({
    name: {type:String, required:true},
    category: {type:String, required:true},
    price: {type:Number, requiredd:true},
    stock: {type:Number, required:true},
    description: {type:String}, //Descipción opcional
});

module.exports = mongoose.model('Producto', ProductoSchema);