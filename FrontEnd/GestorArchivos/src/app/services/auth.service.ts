import { Injectable } from '@angular/core';
import { ConfigAuthService, UsuarioAuth } from './configAuth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private currentUserSubject:
    public usuario: UsuarioAuth | undefined;
    constructor(public configUser: ConfigAuthService, private jwtHelper: JwtHelperService, private cookieService: CookieService) {
        this.configUser = new ConfigAuthService();
    }
    public setUsuario(usuario: UsuarioAuth) {
        this.configUser.setUsuario(usuario);
    }
    public getUsuario() {
        return this.configUser.usuario;
    }
    public isAuthenticated() {
        const token = localStorage.getItem('jwt');
        // const token = this.cookieService.get('AUTHTOKEN');
        if (token && !this.jwtHelper.isTokenExpired(token)) {
          return true;
        }
        console.log('Sesion Expirada');
        return false;
        // return this.configUser.usuario.isAuthenticated;
    }
}
