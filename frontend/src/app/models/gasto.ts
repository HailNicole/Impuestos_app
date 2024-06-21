export class Gasto{
    public id:number;
    public tipo:string;
    public ruc:string;
    public valor:number;

    constructor(id:number,tipo:string,ruc:string,valor:number){
        this.id=id;
        this.tipo=tipo;
        this.ruc=ruc;
        this.valor=valor;
    }
}

export interface Gasto{
    "id": number;
    "tipo":string;
    "ruc":string;
    "valor":number;
}