export class Usuario{
    public idUsuario: number;
    public usuario: string;
    public contrasenia: string;
    public vigente: string;
    public nombre: string;
    public correo: string;

    constructor(){
        this.idUsuario =0;
        this.usuario = "";
        this.contrasenia = "";
        this.vigente = "";
        this.nombre = "";
        this.correo = "";
    }
}
export class Respuesta{
    public codigo: string;
    public mensaje: string;

    constructor(){
        this.codigo = "";
        this.mensaje ="";

    }
}