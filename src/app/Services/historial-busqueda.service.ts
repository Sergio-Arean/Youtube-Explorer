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

    await new Promise(resolve => setTimeout(resolve, 1000)); //16-11
    const response = await fetch(`http://localhost:1234/historiales/${mail_usuario_logueado}`,{method:'GET'});
    
    const json = await response.json();
    await new Promise(resolve => setTimeout(resolve, 1000)); //16-11
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

      /*agregado 16-11*/ 
      //resultado.id = historial.resultados.length.toString();
      resultado.id = this.generarIdAleatorio(8);

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

generarIdAleatorio(tamanioId:number) {
  let result = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < tamanioId; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    result += caracteres.charAt(indiceAleatorio);
  }

  return result;
}


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

/*16-11*/ 
async getUsuariosRegistrados(lista_usuarios:string[]){
  /*metodo que permitira verificar existencia de usuarios
  devolviendo un arreglo de strings con los usuarios */
  try{
    const response_g = await fetch(`${this.url_historiales}`,{method:'GET'});
    if(response_g.ok){ 
      const json = await response_g.json();
      json.forEach((historial:Historial)=>{
          //console.log(historial.id);
          lista_usuarios.push(historial.id);
      });
      return true;
    }else{
      return false;
    }

  }catch(e){
    return false;
  }

}

async eliminarUnaBusqueda(email_usuario_logueado:string,id_resultado_a_eliminar:string){
 /*metodo que elimina una busqueda en particular
 accede a cada usuario de una manera similar al metodo que postea*/ 
 //seccion encontrar al usuario que elimina
const url:string = `${this.url_historiales}${email_usuario_logueado}`;
 let historial:Historial = {
  id: '',
  resultados:[]
};


try{
  //objetivos: encontrar el historial, luego, postearle el resultado
  const response_g = await fetch(url,{method:'GET'});
  if(response_g.ok){ // si la rpta dio okey, significa que encontre el historial
    const data_g = await response_g.json();
    historial.id = data_g.id;
    historial.resultados = data_g.resultados;
    
    //Ya tengo al usuario, tambien tengo todos sus resultados a mi disposicion.
    
    await new Promise(resolve => setTimeout(resolve, 1000)); //retraso 1 segundo

    if(this.BorrarBusqueda(historial,id_resultado_a_eliminar)){ //pude borrarlo? continuo
      const response_d = await fetch(url,{method:'DELETE'}); //deleteo transitorio
      if(response_d.ok){
        console.log(`El historial fue eliminado transitoriamente. Respuesta exitosa`);
        await new Promise(resolve => setTimeout(resolve, 1000));//retraso otro segundo
      
           //Posteo de Historial Actualizado
           const response_post_historial = await fetch(this.url_historiales,{
              method: 'POST',
              body: JSON.stringify(historial),
              headers: {'Content-type': 'application/json'}
            });
            if (response_post_historial.ok) {
              //respuesta exitosa:
              console.log(`Se pudo hacer el post del historial tras eliminarlo transitoriamente`);
              return true;
            } else {
              console.log(`Error al hacer el post del historial: ${response_post_historial.statusText}`);
              return false;
            }
      }else{
        console.log(`error al eliminar historial transitoriamente`);
        return false;
      }
    }else{
      console.log(`La busqueda seleccionada no pudo ser eliminada`);
      return false;
    }
    
    }else{
      console.log(`El usuario y/o su historial no fueron encontrados`);
      return false;
    }}
  catch(e){
        console.log(`Se encontraron errores en el proceso ${e}`);
        return false;

  }


}

BorrarBusqueda(historial:Historial,id_resultado_a_eliminar:string){
  let encontrado:boolean = false;
  for(let i:number=0;i<historial.resultados.length && !encontrado;i++){
    if(historial.resultados[i].id==id_resultado_a_eliminar){
      encontrado=true;
      historial.resultados.splice(i,1);
    }
  }
  return encontrado;
}

async eliminarTodasLasBusquedas(email_usuario_logueado:string){
  /*metodo que elimina una busqueda en particular
  accede a cada usuario de una manera similar al metodo que postea*/ 
  //seccion encontrar al usuario que elimina
 const url:string = `${this.url_historiales}${email_usuario_logueado}`;
  let historial:Historial = {
   id: '',
   resultados:[]
 };
 
 
 try{
   //objetivos: encontrar el historial, luego, postearle el resultado
   const response_g = await fetch(url,{method:'GET'});
   if(response_g.ok){ // si la rpta dio okey, significa que encontre el historial
     const data_g = await response_g.json();
     historial.id = data_g.id;
     historial.resultados = data_g.resultados;
     
     //Ya tengo al usuario, tambien tengo todos sus resultados a mi disposicion.
     
     await new Promise(resolve => setTimeout(resolve, 1000)); //retraso 1 segundo
 
     //'borrado'
     historial.resultados = [];
     //pude borrarlo? continuo
       const response_d = await fetch(url,{method:'DELETE'}); //deleteo transitorio
       if(response_d.ok){
         console.log(`El historial fue eliminado transitoriamente. Respuesta exitosa`);
         await new Promise(resolve => setTimeout(resolve, 1000));//retraso otro segundo
       
            //Posteo de Historial Actualizado
            const response_post_historial = await fetch(this.url_historiales,{
               method: 'POST',
               body: JSON.stringify(historial),
               headers: {'Content-type': 'application/json'}
             });
             if (response_post_historial.ok) {
               //respuesta exitosa:
               console.log(`Se pudo hacer el post del historial tras eliminarlo transitoriamente`);
               return true;
             } else {
               console.log(`Error al hacer el post del historial: ${response_post_historial.statusText}`);
               return false;
             }
       }else{
         console.log(`error al eliminar historial transitoriamente`);
         return false;
       }
     
     
     }else{
       console.log(`El usuario y/o su historial no fueron encontrados`);
       return false;
     }}
   catch(e){
         console.log(`Se encontraron errores en el proceso ${e}`);
         return false;
 
   }
 
 
 }


 /*seccion ver videos anteriores*/
 async getVideosSegunIdResultado(email_usuario_logueado:string,idResultado:string,lista_videos:Video[]){
  /*metodo que carga una lista de videos a partir de un id resultado.
  utilizado en el contexto de usuario que desea ver busquedas anteriores*/ 
  //seccion encontrar al usuario que elimina
  console.log(`Llega un email al service ${email_usuario_logueado} con el id resultado ${idResultado}`);
 const url:string = `${this.url_historiales}${email_usuario_logueado}`;
  let historial:Historial = {
   id: '',
   resultados:[]
 };
 
 try{
   
   const response_g = await fetch(url,{method:'GET'});
   if(response_g.ok){ // si la rpta dio okey, significa que encontre el historial
     const data_g = await response_g.json();
     historial.id = data_g.id;
     historial.resultados = data_g.resultados;
     if(this.BuscarVideos(historial,idResultado,lista_videos)){
      console.log(`Los videos fueron cargados exixtosamente desde el service. asi se ven
      desde el service:`);
      console.log(lista_videos);

     }
   }else{
      console.log(`error en fetch de api`);
   }
  }catch(e){
    console.log(`error: ${e}`);
  } 


}

BuscarVideos(historial:Historial, idResultado:string, lista_videos:Video[]){
  let encontrado:boolean = false;
  for(let i:number=0;i<historial.resultados.length && !encontrado;i++){
    if(historial.resultados[i].id==idResultado){
      encontrado=true;
      //lista_videos = historial.resultados[i].videos;
      this.CargarListaVideos(historial.resultados[i],lista_videos);
    }
  }
  return encontrado;
}

CargarListaVideos(r:Resultado,lista_videos:Video[]){
  const resultado:Resultado = {
    id: r.id,
    fecha: r.fecha,
    hora: r.hora,
    pais: r.pais,
    url_bandera: r.url_bandera,
    cantidad: r.cantidad,
    categoria: r.categoria,
    videos: r.videos
  };
  
  for(let i:number = 0; i<resultado.videos.length;i++){
    const v:Video = {
      id: resultado.videos[i].id,
      imagen: resultado.videos[i].imagen,
      titulo: resultado.videos[i].titulo,
      canal: resultado.videos[i].canal,
      visualizaciones: resultado.videos[i].visualizaciones,
      likes: resultado.videos[i].likes,
      cant_comentarios: resultado.videos[i].cant_comentarios,
      tag: resultado.videos[i].tag
    };
    lista_videos.push(v);
  }
  console.log(`tras desmenuzar, he aqui la lista de videos desde el service:`)
  console.log(lista_videos);
}

}









