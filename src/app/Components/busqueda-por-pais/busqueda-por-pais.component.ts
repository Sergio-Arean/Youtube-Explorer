import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router'; //nos permite recuperar parametros que llegan por url
import { PopularVideosService } from 'src/app/Services/popular-videos.service';
import { Video } from 'src/app/Interfaces/Video';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';

@Component({
  selector: 'app-busqueda-por-pais',
  templateUrl: './busqueda-por-pais.component.html',
  styleUrls: ['./busqueda-por-pais.component.css']
})
export class BusquedaPorPaisComponent {
  idPais:string = '';
  
  cantidad!:string;
  categoria!:string;
  //resultados:any[] = []; //provisorio
  lista_videos:Video[] = []; //6-11
  constructor(private ruti:Router,private route: ActivatedRoute, private popularVideosService: PopularVideosService, private historialBusquedaService:HistorialBusquedaService){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.idPais = params['idPais'];
      this.cantidad = params['cantidad'];
      this.categoria = params['categoria'];

    });
    //con esto especifico que hago con el parametro
    this.getVideos();


  }

  async getVideos(){
    try {
      const data = await this.popularVideosService.getPopularVideos(this.idPais,this.cantidad,this.categoria);
      //this.resultados = data.items; // Asigna los resultados al arreglo (comentado para probar)
      //eq ACA se enviarian los datos al historial

      /*06-11*/ //prueba:
      this.cargarListaVideos(data.items);

      //enviar datos a historial, a este punto nuestra lista ya esta cargada:
      //llamado a service.CargarHistorial(lista_videos)
      /*desde aca enviamos la lista de videos, y el service se encarga
      de gestionar el historial*/ 
      //this.historialBusquedaService.guardarEnHistorial(this.lista_videos,);
      this.guardarEnHistorial();

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }




  verDetallesVideo(idVideo:string){
    //alert(`Prueba del id video ${idVideo}`);
    this.ruti.navigate(['videos', idVideo]);
  }

  /*6-11*/ //el metodo que esta a continuacion LO VA A HACER EL SERVICE!! Provisoriamente esta aca
  cargarListaVideos(json:any){
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
  }

  guardarEnHistorial(){
    const fecha_y_hora:Date = new Date(); 
    this.historialBusquedaService.guardarEnHistorial(this.lista_videos,fecha_y_hora,this.idPais,this.cantidad,this.popularVideosService.devuelveCategoriaSegunID(this.categoria));
  }

}
