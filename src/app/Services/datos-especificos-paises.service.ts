import { Injectable } from '@angular/core';
import { Pais } from '../Interfaces/Pais';

@Injectable({
  providedIn: 'root'
})
export class DatosEspecificosPaisesService {
  /*este servicio se encarga fundamentalmente de tomar 
  datos de la api de paises, los cuales brindan info de
  cada pais. nos interesa en principio tomar la bandera de 
  cada pais*/ 
  url:string='https://restcountries.com/v3.1/alpha/';

  constructor() { }

  async getPaisByCode(idPais:string){ //obtenerTodosLosPaises
    const pais:Pais = {
      nombre_castellano : '',
      url_bandera : ''
    }
    try{
      const data = await fetch(`${this.url}${idPais}`);
      const json = await data.json();
      console.log(`El json del pais es este:`,json);
      pais.nombre_castellano = json[0].translations.spa.common;
      pais.url_bandera = json[0].flags.png;
      console.log(`El objeto pais desde el servicio es este:`,pais);
      return pais;
    }catch(error){
      return pais;
    }

  }

  async getBanderaByCode(idPais:string){
    let pais:Pais = await this.getPaisByCode(idPais);
    if(pais.nombre_castellano!=''){ //si el pais fue fetcheado ok
      return pais.url_bandera;
    }
      return "";
  }

  async getNombreCastellanoByCode(idPais:string){
    let pais:Pais = await this.getPaisByCode(idPais);
    if(pais.nombre_castellano!=''){ //si el pais fue fetcheado ok
      return pais.nombre_castellano;
    }
      return "";
  }
}
