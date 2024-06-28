const {Schema, model} = require ('mongoose'); // SE REQUIEREN LOS DOS METODOS SCHEMA Y MODEL

//El schema contiene un objeto definicion de los datos que se estan guardando
const userSchema = new Schema({
    email: String,
    password: String
},{
    timestamps: true //se agrega en la base un campo llamado createdup y updateup 
});

// recibe el nombre del modelo y el schema en el cual esta basado
module.exports = model('user', userSchema);

//para usarlo en otras partes de la aplicacion es necesario exportarlo 