const mongoose = require('mongoose');

/*mongoose.connect('mongodb://localhost:27017/angular-auth')

.then(db => console.log('Database is Connected'))
.catch(err => console.log(err));

module.exports = mongoose;*/

const dbUri = 'mongodb+srv://madelin:aAGjJCDZGC24xuVI@cluster0.saarj2n.mongodb.net/impuestos';

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
}).catch((error) => {
    console.error('Error conectándose a MongoDB Atlas:', error);
});
