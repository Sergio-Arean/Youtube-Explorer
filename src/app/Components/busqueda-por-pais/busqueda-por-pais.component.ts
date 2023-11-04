import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Route } from '@angular/router'; //nos permite recuperar parametros que llegan por url
import { PopularVideosService } from 'src/app/Services/popular-videos.service';

@Component({
  selector: 'app-busqueda-por-pais',
  templateUrl: './busqueda-por-pais.component.html',
  styleUrls: ['./busqueda-por-pais.component.css']
})
export class BusquedaPorPaisComponent {
  idPais:string = '';
  
  cantidad!:string;
  categoria!:string;
  resultados:any[] = []; //provisorio
  constructor(private ruti:Router,private route: ActivatedRoute, private popularVideosService: PopularVideosService,){

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
      this.resultados = data.items; // Asigna los resultados al arreglo
      //eq ACA se enviarian los datos al historial
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }


  verDetallesVideo(idVideo:string){
    //alert(`Prueba del id video ${idVideo}`);
    this.ruti.navigate(['videos', idVideo]);
  }

}
