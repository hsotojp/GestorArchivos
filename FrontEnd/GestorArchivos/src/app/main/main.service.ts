import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { map, tap, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archivo } from './main.models';
import { Respuesta } from '../registro/register.models';

@Injectable({
    providedIn: 'root'
  })
  export class MainService{

    constructor(private http: HttpClient){}
    urlBackend = 'https://localhost:44384/api';

    public obtenerArchivos(): Observable<Archivo[]>{
        try{
            var token = localStorage.getItem("jwt");
            var idUsuario = localStorage.getItem("idU");
            const headers = new HttpHeaders({
                'Authorization':'bearer '+ token
            });
            return this.http.get(this.urlBackend+'/archivo/'+idUsuario, {headers}).pipe(map(response =>{
                return plainToClass(Archivo, response as Archivo[]);
            }));
        }catch(error){
            console.log("Error en el MainService - obtenerArchivos. "+ error);
            return new Observable<Archivo[]>();

        }

    }

    public cargarArchivo(files: File){
        try{
            var token = localStorage.getItem("jwt");

            let formData: FormData = new FormData();

            console.log(files);

            formData.append('files', files);

            /*var idUsuario = localStorage.getItem("idU");
            if(idUsuario == undefined)
                idUsuario = "";

            formData.append('idUsuario', idUsuario);*/

            const headers = new HttpHeaders({
                'Authorization':'bearer '+ token,
                'Accept': 'application/json'
            });


            return this.http.post(this.urlBackend+'/archivo', formData, {headers}).pipe(map(response => {
                return plainToClass(Respuesta, response as Respuesta);
            }));
        }catch(error){
            console.log("Error en el MainService - CargarArchivo. "+ error);
            return new Observable<Respuesta>();
        }
    }

    
  }