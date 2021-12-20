import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AuthModel } from "./login.models";
import { LoginService } from "./login.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ConfigAuthService, UsuarioAuth } from "../services/configAuth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  usuario: string|undefined;
  contrasenia: string|undefined ;

  constructor(public router: Router, public adminService: LoginService, private jwtHelper: JwtHelperService, public aut: AuthService,
    private cookieService: CookieService, public config: ConfigAuthService) {}
  ngOnInit() {
      
  }
  login() {
    const authModel: AuthModel = new AuthModel();
    authModel.contrasenia = this.contrasenia;
    authModel.usuario = this.usuario;
    console.log("Antes de auntenticar");
    this.adminService.autenticacion(authModel).subscribe( response => {
        if(response != undefined){
            const token = response.token;
            localStorage.setItem("jwt", token);
            const now = new Date();
            now.setHours(now.getHours() + 1);
            this.cookieService.set('AUTHTOKEN', token, now, '/');
            const usuarioAuth: UsuarioAuth = new UsuarioAuth();
            usuarioAuth.usuario = response.idUsuario+"";
            usuarioAuth.isAuthenticated = true;
            this.config.setUsuario(usuarioAuth);

            this.router.navigate(['main']);

        }
    });

    
  }
}