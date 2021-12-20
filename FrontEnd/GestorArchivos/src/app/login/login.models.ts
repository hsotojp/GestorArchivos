export class AuthModel {
    public usuario: string | undefined;
    public contrasenia: string | undefined;
}

export class ResponseAuth{
    public idUsuario: number | undefined;
    public token: string ;

    constructor(){
        this.token = "";
        this.idUsuario =0;
    }
}