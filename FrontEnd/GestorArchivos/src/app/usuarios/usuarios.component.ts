import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "./usuarios.service";
import { Usuario } from "../registro/register.models";


@Component({
    selector: "app-usuarios",
    templateUrl: "./usuarios.component.html",
    styleUrls: ["./usuarios.component.css"]
  })
  export class UsuarioComponent implements OnInit{
    nombreUsuario: string;
    contrasenia: string;
    correo: string;
    nombre: string;
    idUsuario: string;
    constructor(public router: Router, private http: HttpClient, private usuarioService: UsuarioService){
        var aux;
        aux = localStorage.getItem("user")
        if(aux == undefined)
            aux = ""
        this.nombreUsuario = aux; 

        aux = localStorage.getItem("name")
        if(aux == undefined)
            aux = ""
        this.nombre = aux;
        aux = localStorage.getItem("mail")
        if(aux == undefined)
            aux = ""
        this.correo = aux;
        aux = localStorage.getItem("idU")
        if(aux == undefined)
            aux = ""
        this.idUsuario= aux;
        aux = localStorage.getItem("contra")
        if(aux == undefined)
            aux = "" 
        this.contrasenia = aux;
        
        
    }
    ngOnInit() {
      
    }

    public actualizar(){
        const usuario: Usuario = new Usuario();
        usuario.idUsuario = Number(this.idUsuario);
        usuario.usuario = this.nombreUsuario;
        usuario.nombre = this.nombre;
        usuario.correo = this.correo;
        usuario.contrasenia = this.contrasenia;
        usuario.vigente = "S";
        this.usuarioService.actualizar(usuario).subscribe(response => {
            alert(response.mensaje);
            if(response.codigo = "correcto"){
              this.router.navigate(['main']);
            }
          });
    }


    public logout(){
        this.router.navigate(['login']);
    }

  }