import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router'; //nos permite recuperar parametros que llegan por url
import { PopularVideosService } from 'src/app/Services/popular-videos.service';
import { Video } from 'src/app/Interfaces/Video';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import { FiltroComLikVisService } from 'src/app/Services/filtro-com-lik-vis.service';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';

@Component({
  selector: 'app-busqueda-por-pais',
  templateUrl: './busqueda-por-pais.component.html',
  styleUrls: ['./busqueda-por-pais.component.css']
})
export class BusquedaPorPaisComponent {
  idPais:string = '';

  paisDisponible: boolean = true; //para ver si existe
  errorMensaje: string = ''; // Variable para almacenar el mensaje de error

  cantidad!:string;
  categoria!:string;
  //resultados:any[] = []; //provisorio
  lista_videos:Video[] = []; //6-11

  mail_usuario_logueado: string = ''; //variable que almacena mail del usuario logueado en el sistema, o bien null si no hay nadie logueado

  constructor(private ruti:Router,private route: ActivatedRoute, private popularVideosService: PopularVideosService,private historialBusquedaService:HistorialBusquedaService,private autentificacionService: AutentificacionService, private filtroService: FiltroComLikVisService, private datosEspecificosPaises:DatosEspecificosPaisesService){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idPais = params['idPais'];
      this.cantidad = params['cantidad'];
      this.categoria = params['categoria'];

    });

    //en el siguiente bloque de codigo consultamos si tenemos un usuario logueado
    /*this.autentificacionService.user.subscribe(user => {
      if (user) {
        this.mail_usuario_logueado = user.email;
      } else {
        this.mail_usuario_logueado = null;
      }
    });*/ //comentado transitoriamente ya que estamos hardcodeando el mail logueado


    //con esto especifico que hago con el parametro
    this.getVideos();
    this.mail_usuario_logueado = this.autentificacionService.emailUsuario();


  }


async getVideos(){
  try {
    const data = await this.popularVideosService.getPopularVideos(this.idPais, this.cantidad, this.categoria);
    //this.resultados = data.items; // Asigna los resultados al arreglo (comentado para probar)
    //eq ACA se enviarian los datos al historial

    if (data && data.items) //si se guardaron datos existe el pais
    {
      //06-11 //prueba:
      this.cargarListaVideos(data.items);

      //enviar datos a historial, a este punto nuestra lista ya esta cargada:
      //llamado a service.CargarHistorial(lista_videos)
      //desde aca enviamos la lista de videos, y el service se encarga
      //de gestionar el historial
      //this.historialBusquedaService.guardarEnHistorial(this.lista_videos,);
      
      //aca iria un if(mailusuariologueado is null no guardo nada, else si guardo!)
      if(this.mail_usuario_logueado!=''){
        console.log(`Hay un usuario logueado cuyo mail es ${this.mail_usuario_logueado}`);
        this.guardarEnHistorial(); //guardo en historial si tengo un usuario logueado
      }
      
    } 
    else {
      this.errorMensaje = 'PAIS NO DISPONIBLE';
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}
  


  async verDetallesVideo(idVideo:string,tag:string){
    //alert(`Prueba del id video ${idVideo}`);
    //tomo lenguaje del pais //le meti async await
    const lenguaje = await this.datosEspecificosPaises.getIdiomaDelPaisByCode(this.idPais);
    console.log(`El lenguaje retornado por la funcion es ${lenguaje}`);
    //const lenguaje = "es";
    this.ruti.navigate(['videos', idVideo,tag,lenguaje,this.idPais]);
    //el lenguaje? servicio de datos por paises
  }

  /*6-11*/ //el metodo que esta a continuacion LO VA A HACER EL SERVICE!! Provisoriamente esta aca
  cargarListaVideos(json:any){
      json.forEach((item:any)=>{
        //hay tag?
        let tag_video:string="";
       if(item.snippet.tags!=null){
          tag_video = item.snippet.tags[item.snippet.tags.length-1]; //criterio: el ultimo tag
        }
        console.log(`El tag del video es: ${tag_video}`);
        const video:Video = {
          id:item.id,
          imagen:item.snippet.thumbnails.default.url,
          titulo:item.snippet.title,
          canal:item.snippet.channelTitle,
          visualizaciones:item.statistics.viewCount,
          likes:item.statistics.likeCount,
          cant_comentarios:item.statistics.commentCount,
          tag: tag_video
        };
        this.lista_videos.push(video);
      });

      if(this.filtroService.getLikes())
      {
        console.log("ORDENANDO POR LIKES");
        this.lista_videos.sort((a: Video, b: Video) => {
          const likesA = parseInt(a.likes, 10) || 0;
          const likesB = parseInt(b.likes, 10) || 0;
        
          return likesB - likesA;
        });
      }
      if (this.filtroService.getComentarios()) {
        console.log("ORDENANDO POR COMENTARIOS");
        this.lista_videos.sort((a: Video, b: Video) => {
          const comentariosA = parseInt(a.cant_comentarios, 10) || 0;
          const comentariosB = parseInt(b.cant_comentarios, 10) || 0;
  
          return comentariosB - comentariosA;
        });
      }
  
      if (this.filtroService.getVisualizaciones()) {
        console.log("ORDENANDO POR VISUALIZACIONES");
        this.lista_videos.sort((a: Video, b: Video) => {
          const vistasA = parseInt(a.visualizaciones, 10) || 0;
          const vistasB = parseInt(b.visualizaciones, 10) || 0;
  
          return vistasB - vistasA;
        });
      }

      /*this.lista_videos.sort((a: Video, b: Video) => {
        const likesA = parseInt(a.likes, 10) || 0;
        const likesB = parseInt(b.likes, 10) || 0;
      
        return likesB - likesA;
      });*/
      


  }

  guardarEnHistorial(){
    const fecha_y_hora:Date = new Date(); 
    //this.historialBusquedaService.guardarEnHistorial(this.lista_videos,fecha_y_hora,this.idPais,this.cantidad,this.popularVideosService.devuelveCategoriaSegunID(this.categoria));
    console.log(`CONSOLOGUEO PREVIO A LINEA DE CODIGO QUE POSTEA EN HISTORIAL, DESDE 
    BUSQUEDA POR PAIS COMPONENT`);
    this.historialBusquedaService.PostearBusquedaEnUsuario(this.mail_usuario_logueado,this.lista_videos,fecha_y_hora,this.idPais,this.cantidad,this.popularVideosService.devuelveCategoriaSegunID(this.categoria))
    console.log(`CONSOLOGUEO POSTERIOR A LINEA DE CODIGO QUE POSTEA EN HISTORIAL, DESDE 
    BUSQUEDA POR PAIS COMPONENT`);
  }

}
