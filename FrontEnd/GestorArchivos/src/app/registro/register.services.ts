import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta, Usuario } from './register.models';

@Injectable({
    providedIn: 'root'
  })
  export class RegisterService {
    constructor(private http: HttpClient) { }
    urlBackend = 'https://localhost:44384/api';

    public registro(usuario: Usuario){
        try{
            console.log("Vamos a intentar llamar al metodo registrar");
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            const body = JSON.stringify(usuario);
            console.log(usuario);
            return this.http.post(this.urlBackend+'/usuario/registrar', body, {headers}).pipe(map(response => {
                return plainToClass(Respuesta, response as Respuesta);
            }));
        }catch(error){
            console.log("Error en el LoginService - Autentication. "+ error);
            return new Observable<Respuesta>();
        }

    }

  }