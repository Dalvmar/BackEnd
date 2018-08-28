const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const uniqueValidator= require('mongoose-unique-validator')

const rolesValidos={
  values:['ADMIN-ROLE', 'USER-ROLE'],
message:'{VALUE} no es un rol permitido'
}

const usuarioSchema = new Schema({
  
  nombre: {type: String ,required:[true, 'El nombre es necesario']},
  email: {type: String ,unique:true, required:[true, 'El email es necesario']},
  password: {type: String ,required:[true, 'El password es necesario']},
  img:{type:String, required:false },
  role: {type: String,required:true, enum: ["USER-ROLE", "ADMIN-ROLE"],default: "USER-ROLE"},
 

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

usuarioSchema.plugin( uniqueValidator, { message:' {PATH} ∫debe ser unico'});

module.exports= mongoose.model('Usuario', usuarioSchema);
// const User = mongoose.model('User', userSchema);
// module.exports = User;