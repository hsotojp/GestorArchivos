import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Archivo } from "./main.models";
import { MainService } from "./main.service";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})

export class MainComponent implements OnInit{
  usuario: string;
  files: File | undefined;
  public archivos: Archivo[];
  constructor(public router: Router, public mainService: MainService, private httpClient: HttpClient) {
    var test = localStorage.getItem("user");
    if(test == undefined){
      test = "";
    }
    this.usuario = test;
    this.archivos = [];


    this.mainService.obtenerArchivos().subscribe( response => {
      this.archivos = response;
    });
  }
  ngOnInit() {
      
  }
  public download(idArchivo: any): void {
    try{
        var token = localStorage.getItem("jwt");
        if(token == undefined){
            token = "";
        }
        console.log(token);

        const options = {
            headers: new HttpHeaders({
                'Authorization': 'bearer '+token  // if you have to give token
            }),
    
            // Ignore this part or  if you want full response you have 
            // to explicitly give as 'boby'as http client by default give res.json()
            observe:'response' as 'body',
    
           // have to explicitly give as 'blob' or 'json'
            responseType: 'blob' as 'blob'  
        };
        this.httpClient.get('https://localhost:44384/api/archivo/descargar/'+idArchivo ,  options ).subscribe(
            (response: any) => {
               let dataType = response.type;
               let binaryData = [];
               binaryData.push(response);
               let downloadLink = document.createElement('a');
               downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {
                  type: dataType
               }));
               downloadLink.setAttribute('download', "CV Hermes Sotoj.pdf");
               document.body.appendChild(downloadLink);
               downloadLink.click();
            }
         )
    }catch(error){
        console.log("Error en el MainService - obtenerArchivos. "+ error);

    }
  }
  public stageFile(): void {
  }


  public upload(){
    if(this.files != null){
      
      this.mainService.cargarArchivo(this.files).subscribe( response => {
        alert(response.mensaje);
        if(response.codigo = "correcto"){
          this.router.navigate(['main']);
        }
      });
    }

  }

  public logout(){
    
    this.router.navigate(['login']);
  }


}