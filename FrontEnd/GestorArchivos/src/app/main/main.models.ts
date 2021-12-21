export class Archivo{
    public idArchivo: number;
    public nombre: string;
    public extension: string;
    public tamanio: number;
    public ubicacion: string;
    public idUsuario: number;
    constructor(){
        this.idArchivo = 0;
        this.nombre = "";
        this.extension = "";
        this.tamanio = 0.00;
        this.ubicacion = "";
        this.idUsuario = 0;

    }
}