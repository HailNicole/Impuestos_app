const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

// Configurar CORS para permitir todas las solicitudes
app.use(cors());

// Configurar body-parser para analizar JSON y datos URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Función para leer datos de un archivo JSON específico
const leerDatos = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error al leer el archivo:", error);
    return [];
  }
};

// Función para escribir datos en un archivo JSON específico
const escribirDatos = (datos, filePath) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2), "utf8");
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
  }
};

// Ruta GET para obtener todos los datos de un archivo JSON específico
app.get("/api/:archivo", (req, res) => {
  const archivo = req.params.archivo;
  const filePath = path.join(__dirname, `${archivo}.json`);
  const datos = leerDatos(filePath);
  res.json(datos);
});

// Ruta GET para obtener un dato por ID de un archivo JSON específico
app.get("/api/:archivo/:id", (req, res) => {
  const archivo = req.params.archivo;
  const id = parseInt(req.params.id);
  const filePath = path.join(__dirname, `${archivo}.json`);
  const datos = leerDatos(filePath);
  const dato = datos.find((d) => d.id === id);
  if (dato) {
    res.json(dato);
  } else {
    res.status(404).json({ message: "Dato no encontrado" });
  }
});

// Ruta POST para crear un nuevo dato en un archivo JSON específico
app.post("/api/:archivo", (req, res) => {
  const archivo = req.params.archivo;
  const filePath = path.join(__dirname, `${archivo}.json`);
  const datos = leerDatos(filePath);
  const nuevoDato = {
    id: datos.length ? datos[datos.length - 1].id + 1 : 1,
    ...req.body,
  };
  datos.push(nuevoDato);
  escribirDatos(datos, filePath);
  res.status(201).json(nuevoDato);
});

// Ruta PUT para actualizar un dato existente por ID en un archivo JSON específico
app.put("/api/:archivo/:id", (req, res) => {
  const archivo = req.params.archivo;
  const id = parseInt(req.params.id);
  const filePath = path.join(__dirname, `${archivo}.json`);
  const datos = leerDatos(filePath);
  const index = datos.findIndex((d) => d.id === id);
  if (index !== -1) {
    datos[index] = {
      id: id,
      ...req.body,
    };
    escribirDatos(datos, filePath);
    res.json(datos[index]);
  } else {
    res.status(404).json({ message: "Dato no encontrado" });
  }
});

// Ruta DELETE para eliminar un dato por ID en un archivo JSON específico
app.delete("/api/:archivo/:id", (req, res) => {
  const archivo = req.params.archivo;
  const id = parseInt(req.params.id);
  const filePath = path.join(__dirname, `${archivo}.json`);
  const datos = leerDatos(filePath);
  const index = datos.findIndex((d) => d.id === id);
  if (index !== -1) {
    const eliminado = datos.splice(index, 1);
    escribirDatos(datos, filePath);
    res.json(eliminado[0]);
  } else {
    res.status(404).json({ message: "Dato no encontrado" });
  }
});

// Ruta raíz para verificar si el servidor está corriendo
app.get("/", (req, res) => {
  res.send("¡Hola Mundo! El servidor está corriendo.");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});