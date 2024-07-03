export class User{
    public email:string;
    public password:string;

    constructor(email:string,password:string){
        this.email=email;
        this.password=password;
    }
}

export interface User{
    "email":string;
    "password":string;
}