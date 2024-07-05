const { Router } = require('express'); // funcion router 
const router = Router();// obejeto de express

const user = require('../models/user'); // modelo del usuario, interaccion con el usuario para ingreso, consulta, etc 
const reporte = require('../models/reporte')
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
    if (!userFind) {
        return res.status(401).json({ message: "El correo no existe" });
    }

    if (userFind.password !== password) {
        return res.status(401).json({ message: "La contraseña es incorrecta" });
    }
    
    const token = jwt.sign({_id: userFind._id}, 'secretKey', { expiresIn: '1h' });
    return res.status(200).json({token});
})


router.get("/users", async(req, res) => {   
    try {
        const usuarios = await user.find(); // Encuentra todos los documentos en la colección
        res.status(200).json(usuarios); // Devuelve la lista de usuarios en formato JSON
    } catch (err) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

router.get("/reportes/:user_id" , async(req,res) => {
    try {
        const { user_id } = req.params;

        // Construye el filtro para la consulta
        let filter = {};
        if (user_id) {
            filter.user_id = user_id;
        }
        const reportes = await reporte.find(filter)
        res.status(200).json(reportes); // Devuelve la lista de reportes en formato JSON
    } catch (err) {
        res.status(500).send('Error al obtener los reportes');
    }
});

//registro de reporte
router.post('/agregar-reporte', async (req, res) => {
    const newReporte = new reporte (req.body);
    await newReporte.save();// .save() metodo asincrono toma tiempo para gardarse para poder continuar con otras tareas agregar await y en la funcion async
    res.status(200);
})

router.get('/getUserId', getIdByToken, async (req, res) => {
    try {
        const userId = req.userId; // Obtiene el ID del usuario desde el token decodificado
        const usuario = await user.findById(userId); // Encuentra el usuario por su ID en la base de datos
        if (!usuario) return res.status(404).send('Usuario no encontrado.');
        const user_id = usuario._id;
        res.status(200).json({user_id});
    } catch (err) {
        res.status(500).send('Error al obtener el usuario.');
    }
});

module.exports = router;

//En la funcion la cabecera se la debe definir en el postman dando un valor, en este caso se debe dar el token 
function verifyToken(req, res, next){
    if(!req.headers.authorizacion){
        return res.status(401).send('Unauthorized Request');
    }
    //se coloca por defecto la palabra bearer espacio y el token obtenido
    //dividir el string recibido 
    const token = req.headers.authorizacion.split(' ')[1]// crea un arreglo ['Bearer', 'token']
     if (token == 'null'){
        return res.status(401).send('Unauthorized Request');
     }

     const payload = jwt.verify(token, 'secretKey') //Contenido del token
     //console.log(payload)// muestra los datos contenidos en el payload deberia ser el id del usuario
     req.userId = payload._id ;
     next();
}

function getIdByToken(req, res, next) {
    const token = req.headers['authorizacion'];
    if (!token) return res.status(403).send('Token no proporcionado.');

    // La clave secreta debe ser la misma que usaste para firmar el token
    const secretKey = 'secretKey'; 

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido.');
        
        // Decoded contiene la información decodificada, como el _id del usuario
        req.userId = decoded._id;
        next();
    });
}