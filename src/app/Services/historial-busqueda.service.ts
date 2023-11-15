import { Injectable } from '@angular/core';
import { Resultado } from '../Interfaces/Resultado';
import { Video } from '../Interfaces/Video';
import { PopularVideosService } from './popular-videos.service';
import { Historial } from '../Interfaces/Historial';
import { DatosEspecificosPaisesService } from './datos-especificos-paises.service';
import { Pais } from '../Interfaces/Pais';

@Injectable({
  providedIn: 'root'
})
export class HistorialBusquedaService {
  url:string = 'http://localhost:1234/resultados'; //url al json server
  url_historiales:string = 'http://localhost:1234/historiales/'; //url a los historiales de c/usuario
  lista_resultados:Resultado[] = []; //historial, es necesario?? con el json supongo alcanza




  constructor(private popularVideosService:PopularVideosService, private datosEspecificos:DatosEspecificosPaisesService) { }

  
   
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
  /*
  guardarEnHistorial(lista_videos:Video[], date:Date, id_pais:string, cant:string, categoria_video:string){
    /*este metodo recibe la lista de videos y se encarga
    de guardarla en el historial*
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
  }*/



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
/*sabado 11-11*/
async guardarEnHistorialII(email_usuario:string,lista_videos:Video[], date:Date, id_pais:string, cant:string, categoria_video:string){


}

async postResultadoEnUsuario(url:string,historial_resultados:Resultado[], nuevo_resultado:Resultado){
  try{
    await fetch(`${url}/resultados`,{
      method: 'POST',
      body: JSON.stringify(nuevo_resultado),
      headers: {'Content-type': 'application/json'}
    });
    }catch(error){
      console.log(error);
    }  
}


/*paso a paso - arrancamos con mostrar Historial segun usuario logueado*/
async getBusquedasSegunUsuario(mail_usuario_logueado:string|null): Promise<Historial|null>{
  try{
    const response = await fetch(`http://localhost:1234/historiales/${mail_usuario_logueado}`,{method:'GET'});
    const json = await response.json();
    console.log(`Este es el json que getea el service:`,json);
    return json;
    }catch(error){
      return null;
    }
} //logrado, la page recibe un json decente por lo cual ya puedem ostrar los resultados

 formatearNumeroDosDigitos(numero:number) {
  return numero < 10 ? `0${numero}` : numero;
}

/*pasamos ahora al posteo de una nueva busqueda
meotod sbado 11*/
async PostearBusquedaEnUsuario(email_usuario:string|null,lista_videos:Video[], date:Date, id_pais:string, cant:string, categoria_video:string){
  
  //SECCION ENCONTRAR EL HISTORIAL DEL USUARIO
  //defino historial en ppio vacio
  let historial:Historial = {
    id: '',
    resultados:[]
  };

  const url = `http://localhost:1234/historiales/${email_usuario}`;  //identificar usuario a partir del mail
  let usuario_encontrado:boolean = false;

  //SECCION DANDO FORMATO AL RESULTADO A SER POSTEADO
  const formatter = { //seteamos la hora en el formato deseado
    fecha: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`, 
    hora: `${this.formatearNumeroDosDigitos(date.getHours())}:${this.formatearNumeroDosDigitos(date.getMinutes())}`
    //llamado a formateador de categoria
  };

  let getPais:Pais = await this.datosEspecificos.getPaisByCode(id_pais);
  

  const resultado:Resultado = { //generamos el tipo de dato Resultado
     id: "", //XLQV, Json server genera un id, capo
     fecha: formatter.fecha,
     hora: formatter.hora,
     pais: getPais.nombre_castellano, //pais: id_pais,
     url_bandera: getPais.url_bandera,
     cantidad: cant,
     categoria: categoria_video,
     videos: lista_videos
  };

  
  try{
    //objetivos: encontrar el historial, luego, postearle el resultado
    const response_g = await fetch(url,{method:'GET'});
    if(response_g.ok){ //funca esto? si la rpta dio okey, significa que encontre el historial
      usuario_encontrado = true;
      const data_g = await response_g.json();
      historial.id = data_g.id;
      historial.resultados = data_g.resultados;

      /*agregado 15-11*/ 
      resultado.id = historial.resultados.length.toString();

      /*En esta instancia, la variable local historial:Historial
      tiene al usuario. */
      

      await new Promise(resolve => setTimeout(resolve, 1000));

      //borrar historial encontrado
      const response_d = await fetch(url,{method:'DELETE'});
    if(response_d.ok){
     // console.log(`Historial eliminado transitoriamente`);
            /**Ahora, lo que debo hacer es tomar el historial ya captado,
       * agregarle el resultado (ya definido), y luego,
       * hacer el respectivo POST DEL HISTORIAL! (posteamos el historial!)
       */
            await new Promise(resolve => setTimeout(resolve, 1000));

            historial.resultados.push(resultado);

            const response_post_historial = await fetch('http://localhost:1234/historiales/',{
              method: 'POST',
              body: JSON.stringify(historial),
              headers: {'Content-type': 'application/json'}
            });
            if (response_post_historial.ok) {
             // console.log(`Se pudo hacer el post del historial tras eliminarlo transitoriamente`);
            } else {
              console.log(`Error al hacer el post del historial: ${response_post_historial.statusText}`);
            }
    }else{
      console.log(`Error al eliminar el historial: ${response_d.statusText}`);
    }




    }else{
      console.log(`Error al obtener el historial: ${response_g.statusText}`);
    }

  }catch(error){
    console.log(`ERROR EN METODO DE POSTEO: `,error);
  }
}
/* domingo 12-11
metodos pendientes
1)  metodo para que el registrarse un usuario se cree el 'espacio'
  en la base de datos para empezar a almacenar informacion del mismo

2) metodo que elimina un usuario (facil, solo un delete)

3) validaciones con formularios reactivos

4) apis noticias


cosas extra
1) gestionar mejor el historial, que cada busqueda me permita ver esos videos
*/

//metodo para crear espacio de usuario recien registrado en 'base de datos' (jsonServer)
async crearEspacioEnBdd(email_usuario:string){
  /**se supone que en esta instancia el mail que llega ya fue validado */
  let historial:Historial = {
    id: email_usuario,
    resultados:[]
  }; //defino el nuevo historial (el nuevo usuario)
    
              const response_post_historial = await fetch('http://localhost:1234/historiales/',{
              method: 'POST',
              body: JSON.stringify(historial),
              headers: {'Content-type': 'application/json'}
            }); //post de nuestor historial
            
            if (response_post_historial.ok) {
              console.log(`Se pudo hacer el post del historial para el nuevo usuario`);
            } else {
              console.log(`Error al hacer el post del historial: ${response_post_historial.statusText}`);
            }    

}

 

}







