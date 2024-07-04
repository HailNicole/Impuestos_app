const {Schema, model} = require ('mongoose');

const reporteSchema = new Schema({
    user_id:String,
    cedula: String,
    sueldo: Number,
    salud: Number,
    educacion: Number,
    vestimenta: Number,
    vivienda: Number,
    alimentacion: Number,
    tot_gastos: Number,
    base_imponible: Number,
    excedente: Number,
    por_excedente: Number,
    ir_total: Number
},{
    timestamps: true
});

module.exports = model('reporte', reporteSchema);