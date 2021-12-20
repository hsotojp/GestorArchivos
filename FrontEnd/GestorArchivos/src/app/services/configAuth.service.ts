import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigAuthService {
    public usuario = new UsuarioAuth();
    constructor() {
        this.usuario.isAuthenticated = true;
    }
    public setUsuario(usuario: UsuarioAuth) {
        this.usuario = usuario;
    }
}
export class UsuarioAuth {
    usuario: string | undefined;
    isAuthenticated: boolean | undefined;
}
