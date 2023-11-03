import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataMapaFiltrosService {

  constructor() { }

  private nombrePais!:string;
  private idPais!:string;

  getNombrePais():string{
    return this.nombrePais
  }

  setNombrePais(nombre:string):void{
    this.nombrePais = nombre
  }

  getIdPais():string{
    return this.idPais
  }

  setNIdPais(idPais:string):void{
    this.idPais = idPais
  }




}
