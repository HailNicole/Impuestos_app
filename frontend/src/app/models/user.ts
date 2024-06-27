export class User{
    public id:number;
    public name:string;
    public username:string;

    constructor(id:number,name:string,username:string){
        this.id=id;
        this.name=name;
        this.username=username;
    }
}

export interface User{
    "id": number;
    "name":string;
    "username":string;
}