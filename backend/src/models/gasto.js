const {Schema, model} = require ('mongoose'); // SE REQUIEREN LOS DOS METODOS SCHEMA Y MODEL

//El schema contiene un objeto definicion de los datos que se estan guardando
const gastoSchema = new Schema({
    ruc: String,
    tipo: String,
    valor: String
},{
    timestamps: true //se agrega en la base un campo llamado createdup y updateup 
});

module.exports = model('gasto', gastoSchema);