const express = require('express');
const app = express();
const Usuario =require('../models/user')
var bcrypt = require('bcrypt');
var jwt =require ('jsonwebtoken');
var SEED =require ('../Config/config')


app.post('/',(req,res,next)=>{
var body=req.body;
Usuario.findOne({email:body.email}, (err,usuarioBD)=>{
    if (err) {
        return res.status(500).json({

            ok: false,
            mensaje: 'Error al buscar usuario',
            errors: err
        });

    }
    if(!usuarioBD){
        return res.status(400).json({

            ok: false,
            mensaje: 'credenciales incorrectas--email',
            errors: err
        });
    }
    if(!bcrypt.compareSync(body.password, usuarioBD.password) ){
        return res.status(400).json({

            ok: false,
            mensaje: 'credenciales incorrectas--password',
            errors: err
        });
    }

/**crear token */
usuarioBD.password= ':)'

var token=jwt.sign({usuario:usuarioBD},SEED,{expiresIn: 14400}) //dura 4 horas


res.status(200).json({
    ok: true,
    Usuario:usuarioBD,
    token: token,
    id:usuarioBD._id
    });
})



});



module.exports= app;