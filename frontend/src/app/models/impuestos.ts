export class Impuestos {
    public cedula: string="";
    public sueldo: number=0;
    public salud: number=0;
    public educacion: number=0;
    public vestimenta: number=0;
    public vivienda: number=0;
    public alimentacion: number=0;
    public tot_gastos: number=0;
    public base_imponible: number=0;
    public excedente: number=0;
    public por_excedente: number=0;
    public ir_total: number=0;

    constructor(cedula:string,sueldo:number,salud:number,educacion:number,vestimenta:number,vivienda:number,alimentacion:number,tot_gastos:number,base_imponible:number,
        excedente:number,por_excedente:number,ir_total:number){
        this.cedula=cedula;
        this.sueldo=sueldo;
        this.salud=salud;
        this.educacion=educacion;
        this.vestimenta=vestimenta;
        this.vivienda=vivienda;
        this.alimentacion=alimentacion;
        this.tot_gastos=tot_gastos;
        this.base_imponible=base_imponible;
        this.excedente=excedente;
        this.por_excedente=por_excedente;
        this.ir_total=ir_total;
    }
}

export interface Impuestos{
    "cedula": string;
    "sueldo":number;
    "salud":number;
    "educacion":number;
    "vestimenta":number;
    "vivienda":number;
    "alimentacion":number;
    "tot_gastos":number;
    "base_imponible":number;
    "excedente":number;
    "por_excedente":number;
    "ir_total":number;
}