import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthModel, ResponseAuth} from './login.models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
    constructor(private http: HttpClient) { }
    urlBackend = 'https://localhost:44384/api';

    public autenticacion(auth: AuthModel){
        try{
            const headers = new HttpHeaders({
                'Content-Type': 'application/json'
            });
            const body = JSON.stringify(auth);
            return this.http.post(this.urlBackend+'/usuario/authenticate', body, {headers}).pipe(map(response => {
                return plainToClass(ResponseAuth, response as ResponseAuth);
            }));
        }catch(error){
            console.log("Error en el LoginService - Autentication. "+ error);
            return new Observable<ResponseAuth>();
        }

    }

  }