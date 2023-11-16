import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/Interfaces/Video';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';

@Component({
  selector: 'app-ver-busqueda-anterior-page',
  templateUrl: './ver-busqueda-anterior-page.component.html',
  styleUrls: ['./ver-busqueda-anterior-page.component.css']
})
export class VerBusquedaAnteriorPageComponent {
  lista_videos:Video[] = [];
  idPais:string = '';
  idResultado:string='';
  email_usuario_logueado:string='';

  constructor(private historialBusquedaService:HistorialBusquedaService,private route: ActivatedRoute,private rut:Router,private datosEspecificosPaises:DatosEspecificosPaisesService){}

  ngOnInit(){
    
    this.route.params.subscribe(params => {
     // this.idPais = params['idPais'];
      this.email_usuario_logueado = params['email'];
      this.idResultado = params['idResultado'];
      

    });


     this.getVideos();
    
//this.router.navigate(['historial',this.mail_usuario_logueado,idResultado]);
// {path: 'historial/:email/:idResultado', component: VerBusquedaAnteriorPageComponent},

  }

  async getVideos(){
   await this.historialBusquedaService.getVideosSegunIdResultado(this.email_usuario_logueado,this.idResultado,this.lista_videos);
   console.log(this.lista_videos);
  }


  async verDetallesVideo(idVideo:string,tag:string){
    //alert(`Prueba del id video ${idVideo}`);
    //tomo lenguaje del pais //le meti async await
    const lenguaje = await this.datosEspecificosPaises.getIdiomaDelPaisByCode(this.idPais);
    console.log(`El lenguaje retornado por la funcion es ${lenguaje}`);
    //const lenguaje = "es";
    this.rut.navigate(['videos', idVideo,tag,lenguaje,this.idPais]);
    //el lenguaje? servicio de datos por paises
  }



}
