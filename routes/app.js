const express = require('express');
const app = express();


app.get('/',(req,res,next)=>{
    res.status(200).json({
        //mensaje:'OK'
        ok:true,
        mensaje:'Peticion realizada correctamente'
    })
    });

    module.exports=app;