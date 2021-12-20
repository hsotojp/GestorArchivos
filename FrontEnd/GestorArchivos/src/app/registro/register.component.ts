import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "./register.models";
import { RegisterService } from "./register.services";
import { HttpClient } from "@angular/common/http";


@Component({
    selector: "app-registro",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
  })
  export class RegisterComponent implements OnInit{
    usuario: string;
    contrasenia: string;
    correo: string;
    nombre: string;

    constructor(public router: Router, public registerService: RegisterService, private http: HttpClient){
        this.usuario = "";
        this.contrasenia = "";
        this.correo = "";
        this.nombre = "";
    }
    ngOnInit() {
      
    }

    registrar(){
        const usuario: Usuario = new Usuario();
        usuario.usuario = this.usuario;
        usuario.contrasenia = this.contrasenia;
        usuario.correo = this.correo;
        usuario.nombre = this.nombre;
        usuario.vigente = "S";
        console.log("Registrando usuario...");
        this.registerService.registro(usuario).subscribe(response => {
          alert(response.mensaje);
          if(response.codigo = "correcto"){
            this.router.navigate(['login']);
          }
        });
    }

  }