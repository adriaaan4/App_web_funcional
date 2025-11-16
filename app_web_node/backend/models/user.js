const mongoose = require('mongoose');
const {Schema} = mongoose;
const UsuarioSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    office: {type:String, required:true},
    position: {type:String, required:true},
    salary: {type:Number, required:true},
});

module.exports = mongoose.model('Usuario', UsuarioSchema);