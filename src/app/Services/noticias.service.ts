import { Injectable } from '@angular/core';
import { Noticia } from '../Interfaces/Noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
//lista_noticias:Noticia[] = [];

url1:string='https://newsapi.org/v2/everything?q=';
//parametro:string=''; //milei : TAG!
url2:string='&sortBy=publishedAt&language=';
//lenguaje:string='';//es
api_key:string = '&apiKey=cc3a9909dec54e719d2d24e6144f34b0';
//url1 + PARAMETRO + url2 + LENGUAJE + API KEY



  constructor() { }
  async getNoticiasRelacionadasByTag(parametro:string,lenguaje:string,idPais:string){
    if(parametro==''){
      return null;
    }
    const url = `${this.url1}${parametro}${this.url2}${lenguaje}${this.api_key}`;
    try{
      const response = await fetch(url);
      if(response.ok){
        const json = await response.json();
        console.log(`Consologueando el JSON DE NOTICIAS DESDE NOTICIAS SERVICE:`);
        console.log(json);
        return this.filtrarResultados(json,parametro,idPais.toLowerCase());
      }else{
        return null;
      }
    }catch(e){
      console.log(`Error al traer noticias: ${e}`);
      return null;
    }

  }

  filtrarResultados(json:any,tag:string,id_pais:string){ //crear noticias
    const articulos = json.articles; //arreglo de articulos
    let lista_noticias:Noticia[] = []; //limpiamos lista resultados

    articulos.forEach((item:any)=>{
    //  console.log(item);
       //1ra cuestion: la noticia tiene foto? //solo prosigo si esto es true
       if(item.urlToImage!=null){
        const titulo = item.title; //aca se almacena al titulo completo
        const descripcion = item.description;
        const contenido = item.content;
        const url_noticia = item.url;

        //2da cuestion: el tag coincide con algo de esto?
       // if (titulo.includes(tag) || descripcion.includes(tag) || contenido.includes(tag)){
          //3ra cuestion. la pagina es de el pais?
         //if(url_noticia.includes(`${id_pais}/`)){
              //Cumplidos todos los requisitos, damos como valida la noticia, creandola y pusheandola
              const noticia:Noticia = {
                  title : titulo,
                  description: descripcion,
                  url : url_noticia,
                  urlToimage: item.urlToImage,
                  content: contenido
              };
              lista_noticias.push(noticia); 
       //  }
      // }
       }


    });
      console.log(`Prueba desde noticias service de las noticias que van a ser retornadas`);
      console.log(lista_noticias);
      return lista_noticias;
  }

  

  /*export interface Noticia{
    title:string,
	description:string,
	url:string,
	urlToimage:string,
	content:string

}   */

/* Lunes 13/11 */
async getNoticias(parametro:string,lenguaje:string,idPais:string,noticias_locales:Noticia[], noticias_internacionales:Noticia[]){
  const data = await this.ReformulandoGetNoticiasRelacionadasByTag(parametro,lenguaje,idPais,noticias_locales,noticias_internacionales);
  if(data){
      return true; //significa que los arreglos fueron cargados
  }
    return false; //significa que los arreglo no fueron cargados
}


async ReformulandoGetNoticiasRelacionadasByTag(parametro:string,lenguaje:string,idPais:string,noticias_locales:Noticia[], noticias_internacionales:Noticia[]){
  if(parametro==''){
    return null;
  }
  const url = `${this.url1}${parametro}${this.url2}${lenguaje}${this.api_key}`;
  try{
    const response = await fetch(url);
    if(response.ok){
      const json = await response.json();
      console.log(`Consologueando el JSON DE NOTICIAS DESDE NOTICIAS SERVICE:`);
      console.log(json);
      this.ReformulandofiltrarResultados(json,parametro,idPais.toLowerCase(),noticias_locales,noticias_internacionales);
      return true;
    }else{
      return false;
    }
  }catch(e){
    console.log(`Error al traer noticias: ${e}`);
    return false;
  }

}



ReformulandofiltrarResultados(json:any,tag:string,id_pais:string,noticias_locales:Noticia[], noticias_internacionales:Noticia[]){ //carga de arreglo de noticias
  /*este metodo filtra resultados. el criterio es resultado nacional = url con codigo de pais
  									  resultado internacional = url.com (sin codigo pais)
  
    Para evitar que haya un exceso de noticias, arreglos de no mas de 5 elementos */
    
    const articulos = json.articles; //arreglo de articulos


    articulos.forEach((item:any)=>{
       //1ra cuestion: la noticia tiene foto? //solo prosigo si esto es true
       if(item.urlToImage!=null){
        const titulo = item.title; //aca se almacena al titulo completo
        const descripcion = item.description;
        const contenido = item.content;
        const url_noticia = item.url;
        
                  const noticia:Noticia = { //este es el objeto noticia que ira a uno u otro arreglo
                  title : titulo,
                  description: descripcion,
                  url : url_noticia,
                  urlToimage: item.urlToImage,
                  content: contenido
              };


        //2da cuestion: el tag coincide con algo de esto? && //3ra cuestion. la pagina es de el pais? //unimos ambos criteiros x el momento
        if(url_noticia.includes(`${id_pais}/`)){   
          //(titulo.includes(tag) || descripcion.includes(tag) || contenido.includes(tag)) 
                if(noticias_locales.length<5){
                		noticias_locales.push(noticia); 
                }
                
         } else{
         		if(noticias_internacionales.length<5){
         			noticias_internacionales.push(noticia);
         		}   			
       }
      }
    });
     console.log(`Consologueando desde noticias service!
     El arreglo de noticias locales tiene ${noticias_locales.length},
     el arreglo de noticias internacionales tiene ${noticias_internacionales.length}`);
}



}
