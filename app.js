//requires
var express =require('express');
var  mongoose =require('mongoose')
const bodyParser= require('body-parser')

//inicializar variables
var app=express();

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



//importar rutas
var appRoutes=require('./routes/app')
var loginRoutes=require('./routes/login')
var usuarioRoutes=require('./routes/usuario')

//conexion bbdd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err,res)=>{
if(err) throw err;
console.log("BASE DE DATOS :\x1b[32m%s\x1b[0m" , 'online')


})

//rutas
app.use('/usuario',usuarioRoutes);
app.use('/login',loginRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3001,()=>{
    console.log("expres  server puerto 3001: \x1b[32m%s\x1b[0m" , 'online')
})