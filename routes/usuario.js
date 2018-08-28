const express = require('express');
const app = express();
const Usuario =require('../models/user')

var bcrypt = require('bcrypt');
var jwt =require ('jsonwebtoken');
var mdAutnticacion= require('../middleware/auntenticacion')
//var SEED =require ('../Config/config')


/**OBTENER USUARIO */ 
app.get('/',mdAutnticacion.verificaToken, (req, res, next) => {

    Usuario.find({} ,(err, usuarios) => {

        if (err) {
            return res.status(500).json({
                //mensaje:'OK'
                ok: false,
                mensaje: 'error cargando usuarios',
                errors: err
              });
              }
           

        res.status(200).json({
            //mensaje:'OK'
            ok: true,
            usuarios: usuarios
        });
    
});
});



/**ACTUALIZAR USUARIO **/

app.put('/:id', mdAutnticacion.verificaToken,(req, res, next) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({

                ok: false,
                mensaje: 'error crear usuarios',
                errors: err
            });

        }
        if (!usuario) {

            return res.status(400).json({

                ok: false,
                mensaje: 'el usuario con el id ' + id + ' no existe',
                errors: { message: 'no existe un usuario con ese ID' }
            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({

                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });

            }
            usuarioGuardado.password=':)'
            res.status(200).json({

                ok: true,
                usuario: usuarioGuardado
            });

        })

    });


})

/**CREAR NUEVO URUARIO* */

 app.post('/',mdAutnticacion.verificaToken, (req,res,next)=>{
  let body=req.body;
  
let usuario= new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password,10 ),
    img: body.img,
    role: body.role
});

usuario.save( (err,usuarioGuardado )=>{
 
if (err) {
    return res.status(400).json({
  
        ok: false,
        mensaje: 'error crear usuarios',
        errors: err
      });

 }
  res.status(201).json({
 
    ok: true,
    usuario:usuarioGuardado,
    usuariotoken:req.usuario
});

 })
 });


 /**BORRAR URUARIO**/

 app.delete('/:id',mdAutnticacion.verificaToken, (req,res,next)=>{

    var id=req.params.id;
    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
        if (err) {
            return res.status(500).json({
          
                ok: false,
                mensaje: 'error al borrar usuarios',
                errors: err
              });
        
         }
         if (!usuarioBorrado) {
            return res.status(400).json({
          
                ok: false,
                mensaje: 'No existe un usuario con este id',
                errors: {message:'No existe un usuario con este id'}
              });
        
         }
          res.status(200).json({
         
            ok: true,
            usuario:usuarioBorrado
        });
        
         

    })
 })
    module.exports=app;