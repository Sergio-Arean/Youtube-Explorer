import { Injectable } from '@angular/core';
import { Resultado } from '../Interfaces/Resultado';
import { Video } from '../Interfaces/Video';
import { PopularVideosService } from './popular-videos.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialBusquedaService {
  url:string = 'http://localhost:1234/resultados'; //url al json server
  url_historiales:string = 'http://localhost:1234/historiales/'; //url a los historiales de c/usuario
  lista_resultados:Resultado[] = []; //historial, es necesario?? con el json supongo alcanza
  constructor(private popularVideosService:PopularVideosService) { }

  
   
 /*Metodos asociados al GET*/
 async getHistorial(){ //metodo que devuelve una lista de resultados
	try{
	const response = await fetch(this.url,{method:'GET'});
  const json = await response.json();
  console.log(`El json desde el historial de busqueda service:`);
  console.log(json);
  return json;
	}catch(error){
		return(`Error:${error}`); 
	}
}





/**
 *     id:string, //para el borrado supongo que es necesario
    fecha:string, //si bien para esta propiedad y la de abajo usaremos date, eq esto facilita el json
    hora:string, //lo ultimo q hicimos fue cambiar esto a number
    pais:string,
    cantidad:string, //string? EQ si, no realizamos manipulacion numerica asiq x ahora eq es un string
    categoria:string,
    videos:Video[],
 */

/**
 *   cargarListaVideos(json:any){
      json.forEach((item:any)=>{
        const video:Video = {
          id:item.id,
          imagen:item.snippet.thumbnails.default.url,
          titulo:item.snippet.title,
          canal:item.snippet.channelTitle,
          visualizaciones:item.statistics.viewCount,
          likes:item.statistics.likeCount,
          cant_comentarios:item.statistics.commentCount,
        };
        this.lista_videos.push(video);
      });
 */
  


  /*Metodos asociados al POST*/
  guardarEnHistorial(lista_videos:Video[], date:Date, id_pais:string, cant:string, categoria_video:string){
    /*este metodo recibe la lista de videos y se encarga
    de guardarla en el historial*/ 
    const formatter = {
      fecha: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, 
      hora: `${date.getHours()}:${date.getMinutes()}`
      //llamado a formateador de categoria
    };

    const resultado:Resultado = {
       id: "", //XLQV, Json server genera un id, capo
       fecha: formatter.fecha,
       hora: formatter.hora,
       pais: id_pais,
       cantidad: cant,
       categoria: categoria_video,
       videos: lista_videos
    };
    this.lista_resultados.push(resultado); //necesario
    this.postResultado(resultado); //es necesario el async await aca? mm xlqe no.
  }



 async postResultado(resultado:Resultado) {
	try{
    await fetch(this.url,{
      method: 'POST',
      body: JSON.stringify(resultado),
      headers: {'Content-type': 'application/json'}
    });
    }catch(error){
      console.log(error);
    }   

 }

 /**Reformulacion de metodos.. teniendo en cuenta los emails
  * Vamos a hacer el paso a paso de aca en mas para facilitar..
  * La particularidad de la pelicula actual es que todo POST
  * requiere un previo GET.
  */
 /*
 async postHistorial(resultado:Resultado) { 
	try{
    await fetch(this.url_historiales,{
      method: 'POST',
      body: JSON.stringify(resultado),
      headers: {'Content-type': 'application/json'}
    });
    }catch(error){
      console.log(error);
    }   

 }*/

 

}







