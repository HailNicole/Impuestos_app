// inicio del servidor 

const express = require('express'); 
const app = express();
const cors = require('cors');

require('./database');

app.use(cors());
app.use(express.json()); //Ser capaz de convertie los datos que recibe del servidor a datos javascript que van a apoderse manipular

app.use(require('./routes/index'))

app.listen(3000);

console.log('Server on port', 3000);