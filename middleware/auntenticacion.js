var jwt =require ('jsonwebtoken');
var SEED =require ('../Config/config')




/**VERIFICAR TOKEN**//**hay una mejor forma de hacer esto */

// app.use('/',(req,res,next)=>{
//     var token=req.query.token;
//     jwt.verify(token, SEED, (err,decoded)=>{
//         if (err) {
//             return res.status(401).json({//no autorizado
//                 //mensaje:'OK'
//                 ok: false,
//                 mensaje: 'token incorrecto',
//                 errors: err
//               });
//               }
//               next();
//     })
    
//     })

/**VERIFICAR TOKEN**//**hay una mejor forma de hacer esto */

exports.verificaToken= function(req,res,nest){



    var token=req.query.token;
    jwt.verify(token, SEED, (err,decoded)=>{
        if (err) {
            return res.status(401).json({//no autorizado
                //mensaje:'OK'
                ok: false,
                mensaje: 'token incorrecto',
                errors: err
              });
              }

              req.usuario =decoded.usuario;
              next();

            
              }
    
            );

}