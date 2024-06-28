const { Router } = require('express'); // funcion router 
const router = Router();// obejeto de express

const user = require('../models/user'); // modelo del usuario, interaccion con el usuario para ingreso, consulta, etc
const gasto = require('../models/gasto')

const jwt = require('jsonwebtoken');

router.get('/', (req, res) => res.send('Hello Word')) //Define las rutas 

//registro del usuario 
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const newUser = new user ({email, password});
    await newUser.save();// .save() metodo asincrono toma tiempo para gardarse para poder continuar con otras tareas agregar await y en la funcion async
    const token = jwt.sign({_id: newUser._id}, 'secretKey');// despues de guardar el dato en la base de crea el token el mismos que es devuelto al cliente
    res.status(200).json({token});
})

//logeo de usuario 
router.post('/login', async(req, res) => {
    const {email, password} = req.body; //recibe el email y la contraseña
    const userFind = await user.findOne({email}); // busca por el correo en la base de datos si lo encuentra lo guarda
    if(!user) return res.status(401).send("El correo no existe")
    if(user.password !== password) return res.status(401).send("La contraseña erronea")

    const token = jwt.sign({_id: user._id}, 'secretKey');
    return re.status(200).json({token});
})

//registro de factura
router.post('/factura', async (req, res) => {
    const { ruc, tipo, valor} = req.body;
    const newGasto = new gasto ({ruc, tipo, valor});
    await newGasto.save();// .save() metodo asincrono toma tiempo para gardarse para poder continuar con otras tareas agregar await y en la funcion async
    const token = jwt.sign({_id: newGasto._id}, 'secretKey');
    res.status(200).json({token});
})

//Se ejecuta primero la ruta a continuación se ejecuta la funcion 
router.get('/private-task', verifyToken,(req, res) =>{
    res.json([
        {
            _id:1,//datos publicos que todo el mundo puede ver 
            name: 'Task one',
            description:'lorem ipsum',
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            _id:2,
            name: 'Task two',
            description:'lorem ipsum',
            date:"2024-11-17T20:39:05.211Z"
        },
        {
            _id:3,
            name: 'Task three',
            description:'lorem ipsum',
            date:"2024-11-17T20:39:05.211Z"
        }
    ])
})

module.exports = router;

//En la funcion la cabecera se la debe definir en el postman dando un valor, en este caso se debe dar el token 
function verifyToken(req, res, next){
    if(!req.headers.authorizacion){
        return res.status(401).send('Unthorize Request');
    }
    //se coloca por defecto la palabra bearer espacio y el token obtenido
    //dividir el string recibido 
    const token = req.headers.authorizacion.split(' ')[1]// crea un arreglo ['Bearer', 'token']
     if (token == 'null'){
        return res.status(401).send('Unthorize Request');
     }

     const payload = jwt.verify(token, 'secretKey') //Contenido del token
     //console.log(payload)// muestra los datos contenidos en el payload deberia ser el id del usuario
     req.userId = payload._id ;
     next();
}