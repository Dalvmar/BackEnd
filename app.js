//requires
var express =require('express');
var  mongoose =require('mongoose')

//inicializar variables
var app=express();


//conexion bbdd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err,res)=>{
if(err) throw err;
console.log("BASE DE DATOS :\x1b[32m%s\x1b[0m" , 'online')


})

//rutas
app.get('/',(req,res,next)=>{
res.status(200).json({
    //mensaje:'OK'
    ok:true,
    mensaje:'Peticion realizada correctamente'
})
});

//escuchar peticiones
app.listen(3001,()=>{
    console.log("expres  server puerto 3001: \x1b[32m%s\x1b[0m" , 'online')
})