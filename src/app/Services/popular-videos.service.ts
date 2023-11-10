import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PopularVideosService {
  // url_1:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode='
  url_1:string = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='
  //30&regionCode=AR
  //&videoCategoryId=10&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
  url_3:string = '&videoCategoryId=';
  cantidad:string = ''; 
  url_2:string = '&regionCode='
  region:string = '';
  video_category:string = ''; 
  
 API_KEY:string = '&key=AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM';
 link:string = '';
 // el link seria asi: url_1 + cantidad + url_2 + region + url_3  + video_category + API_KEY;

  constructor() { }
  //Llamado a API:
  async getPopularVideos(idPais:string,cantidad:string,video_category:string){
      this.region = idPais;
      this.cantidad = cantidad;
      this.video_category = video_category;
      this.link = ''; //agreagado: limpieza de link
      try{
        //this.link = `${this.link}${this.url_1}${this.region}${this.API_KEY}`; //1ra version
        this.link = `${this.link}${this.url_1}${this.cantidad}${this.url_2}${this.region}${this.url_3}${this.video_category}${this.API_KEY}`;
        console.log(`Este es el link: ${this.link}`); 
        let response = await fetch(this.link);
        let json = await response.json();
        console.log(json);
        return json;
      }catch(e){
        return `Error: ${e}`; //esta bien esto?
      }
  }


  devuelveCategoriaSegunID(id_categoria:string):string{
    let categoria:string='';
    switch (id_categoria) {
      case "1":
        categoria = "Cine y Animación";
        break;
    
      case "2":
        categoria = "Autos y Vehículos";
        break;
    
      case "10":
        categoria = "Música";
        break;
    
      case "15":
        categoria = "Mascotas y Animales";
        break;
    
      case "17":
        categoria = "Deportes";
        break;
    
      case "22":
        categoria = "Personas y Blogs";
        break;
    
      case "23":
        categoria = "Comedia";
        break;
    
      case "24":
        categoria = "Entretenimiento";
        break;
    
      case "25":
        categoria = "Noticias y Política";
        break;
    
      case "26":
        categoria = "Howto & Style";
        break;
    
      case "28":
        categoria = "Ciencia y Tecnología";
        break;
    
      case "29":
        categoria = "Activismo";
        break;
    
      default:
        categoria = "No identificada"; //
    }
    
    return categoria;
  }

  //Pais seleccionado/hovereado esta disponible en la API de Youtube?:
isDisponible(idPais: string):boolean{
   //por el momento, me centro en los que NO estan disponibles en el siguiente switch:
    switch (idPais) {
      case 'AF':
      case 'AS':
      case 'AD':
      case 'AO':
      case 'AI':
      case 'AQ':
      case 'AG':
      case 'AW':
      case 'BS':
      case 'BB':
      case 'BZ':
      case 'BJ':
      case 'BM':
      case 'AX':
      case 'BT':
      case 'BQ':
      case 'BW':
      case 'BV':
      case 'IO':
      case 'BN':
      case 'BF':
      case 'BI':
      case 'CV':
      case 'CM':
      case 'KY':
      case 'CF':
      case 'TD':
      case 'CN':
      case 'CX':
      case 'CC':
      case 'KM':
      case 'CD':
      case 'CG':
      case 'CK':
      case 'CU':
      case 'CW':
      case 'CI':
      case 'DJ':
      case 'DM':
      case 'GQ':
      case 'ER':
      case 'SZ':
      case 'ET':
      case 'FK':
      case 'FO':
      case 'FJ':
      case 'FR':
      case 'GF':
      case 'PF':
      case 'TF':
      case 'GA':
      case 'GM':
      case 'GI':
      case 'GL':
      case 'GD':
      case 'GP':
      case 'GU':
      case 'GG':
      case 'GN':
      case 'GW':
      case 'GY':
      case 'HT':
      case 'HM':
      case 'VA':
      case 'IR':
      case 'IM':
      case 'JE':
      case 'KI':
      case 'KP':
      case 'KG':
      case 'LS':
      case 'LR':
      case 'MO':
      case 'MG':
      case 'MW':
      case 'MV':
      case 'ML':
      case 'MH':
      case 'MQ':
      case 'MR':
      case 'MU':
      case 'YT':
      case 'FM':
      case 'MC':
      case 'MN':
      case 'MS':
      case 'MZ':
      case 'MM':
      case 'NA':
      case 'NR':
      case 'NC':
      case 'NI':
      case 'NE':
      case 'NU':
      case 'NF':
      case 'MP':
      case 'PW':
      case 'PS':
      case 'PN':
      case 'RW':
      case 'RE':
      case 'BL':
      case 'SH':
      case 'KN':
      case 'LC':
      case 'MF':
      case 'PM':
      case 'VC':
      case 'WS':
      case 'SM':
      case 'ST':
      case 'SC':
      case 'SL':
      case 'SX':
      case 'SB':
      case 'SO':
      case 'GS':
      case 'SS':
      case 'SD':
      case 'SR':
      case 'SJ':
      case 'SY':
      case 'TJ':
      case 'TL':
      case 'TG':
      case 'TK':
      case 'TO':
      case 'TT':
      case 'TM':
      case 'TC':
      case 'TV':
      case 'UM':
      case 'UZ':
      case 'VU':
      case 'VG':
      case 'VI':
      case 'WF':
      case 'EH':
      case 'ZM':
        return false;
  
      default:
        return true;
    }
  }
  

  /**Claro d última si llamas a la función isDisponible , dentro de popularVideosService 
   * (que es la que implemente en el mapa con China para q salga el alert 
   * y evita que el usuario busque al dope) calculo q sería la solución..onda reutilizar esa función */

}
