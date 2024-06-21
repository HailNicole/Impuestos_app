const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Ruta al archivo datos.json
const datosPath = path.join(__dirname, 'datos.json');

// Configurar CORS para permitir todas las solicitudes
app.use(cors());

// Configurar body-parser para analizar JSON y datos URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Función para leer datos de datos.json
const leerDatos = () => {
    const data = fs.readFileSync(datosPath, 'utf8');
    return JSON.parse(data);
};

// Función para escribir datos en datos.json
const escribirDatos = (datos) => {
    fs.writeFileSync(datosPath, JSON.stringify(datos, null, 2), 'utf8');
};

// Ruta GET para obtener todos los datos
app.get('/api/datos', (req, res) => {
    const datos = leerDatos();
    res.json(datos);
});

// Ruta GET para obtener un dato por ID
app.get('/api/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const datos = leerDatos();
    const dato = datos.find(d => d.id === id);
    if (dato) {
        res.json(dato);
    } else {
        res.status(404).json({ message: 'Dato no encontrado' });
    }
});

// Ruta POST para crear un nuevo dato
app.post('/api/datos', (req, res) => {
    const datos = leerDatos();
    const nuevoDato = {
        id: datos.length ? datos[datos.length - 1].id + 1 : 1,
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        valor: req.body.valor
    };
    datos.push(nuevoDato);
    escribirDatos(datos);
    res.status(201).json(nuevoDato);
});

// Ruta PUT para actualizar un dato existente por ID
app.put('/api/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const datos = leerDatos();
    const index = datos.findIndex(d => d.id === id);
    if (index !== -1) {
        datos[index] = {
            id: id,
            tipo: req.body.tipo,
            ruc: req.body.ruc,
            valor: req.body.valor
        };
        escribirDatos(datos);
        res.json(datos[index]);
    } else {
        res.status(404).json({ message: 'Dato no encontrado' });
    }
});

// Ruta DELETE para eliminar un dato por ID
app.delete('/api/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const datos = leerDatos();
    const index = datos.findIndex(d => d.id === id);
    if (index !== -1) {
        const eliminado = datos.splice(index, 1);
        escribirDatos(datos);
        res.json(eliminado[0]);
    } else {
        res.status(404).json({ message: 'Dato no encontrado' });
    }
});

// Ruta raíz para verificar si el servidor está corriendo
app.get('/', (req, res) => {
    res.send('¡Hola Mundo! El servidor está corriendo.');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});