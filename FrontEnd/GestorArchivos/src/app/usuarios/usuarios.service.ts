import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta, Usuario } from '../registro/register.models';

@Injectable({
    providedIn: 'root'
  })
  export class UsuarioService {
    constructor(private http: HttpClient) { }
    urlBackend = 'https://localhost:44384/api';

    public actualizar(usuario: Usuario){
        try{
            var token = localStorage.getItem("jwt");
            var idUsuario = localStorage.getItem("idU");
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization':'bearer '+ token
            });
            const body = JSON.stringify(usuario);
            return this.http.post(this.urlBackend+'/usuario/modificar', body, {headers}).pipe(map(response => {
                return plainToClass(Respuesta, response as Respuesta);
            }));
        }catch(error){
            console.log("Error en el UsuarioService - registro. "+ error);
            return new Observable<Respuesta>();
        }

    }

  }