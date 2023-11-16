import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/Interfaces/Noticia';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';
import { NoticiasService } from 'src/app/Services/noticias.service';

@Component({
  selector: 'app-detalles-video',
  templateUrl: './detalles-video.component.html',
  styleUrls: ['./detalles-video.component.css']
})
export class DetallesVideoComponent {

  idVideo:string='';
  urlVideo:any='';
  tag:string='';
  lenguaje:string='';
  idPais:string='';
  noticias_relacionadas:Noticia[]= [];
  aviso_sin_noticias = '';
  nombre_pais_castellano:string='';
  url_bandera_pais='';
  noticias_locales:Noticia[] = [];
  noticias_internacionales:Noticia[] = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer, 
    private noticiasService:NoticiasService, 
    private datosEspecificosPaises: DatosEspecificosPaisesService){
  }

  ngOnInit(){
    this.route.params.subscribe(params =>
    
    {this.idVideo = params['idVideo'];
     this.tag = params['tag'];
     this.lenguaje = params['lenguaje'];
     this.idPais = params['idPais'];
    });
    //con esto especifico que hago con el parametro

    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.idVideo}`);
    //este componente recibe el ide del video, puede recibir el pais y tambien el tag

   // this.getNoticiasRelacionadas(); //LISTAR NOTICIAS RELACIONADAS AL VIDEO CLICKEADO! //comentado lunes 13-11

    this.consologueoInformativo();
    /*Lunes 13-11*/
    this.cargarVista();
  }

  consologueoInformativo(){
    console.log(`Esta es la prueba de que el servicio de listar noticias puede llegar a funcionar.
    Vas a pedir noticias de un pais con Id${this.idPais},con el tag ${this.tag},en donde se habla en ${this.lenguaje}`);

  }

  async cargarVista(){
    this.getNombrePaisCastellano();
    this.getBanderaPais();
    await this.cargarNoticias();
    console.log(`Consologueando desde VISTA DETALLES VIDEO:
    En nuestro arreglo de NOTICIAS LOCALES TENEMOS ${this.noticias_locales.length} ELEMENTOS,
    POR OTRO LADO, en nuestro arreglo de NOTICIAES INTERNACIONALES, TENEMOS 
    ${this.noticias_internacionales.length} ELEMENTOS`);
  }

  /*Lunes 13-11*/
  async getNombrePaisCastellano(){
    this.nombre_pais_castellano = await this.datosEspecificosPaises.getNombreCastellanoByCode(this.idPais);
  }

  async getBanderaPais(){
    this.url_bandera_pais = await this.datosEspecificosPaises.getBanderaByCode(this.idPais);
  }

  async cargarNoticias(){
    await this.noticiasService.getNoticias(this.tag,this.lenguaje,this.idPais,this.noticias_locales,this.noticias_internacionales);
  }

  hayNoticiasLocales(){
    if(this.noticias_locales.length>0){
      return true;
    }
    return false;
  }
  hayNoticiasInternacionales(){
    if(this.noticias_internacionales.length>0){
      return true;
    }
    return false;
  }

}


/* A BORRAR

async getNoticiasRelacionadas(){
    //this.noticiasService.getNoticiasRelacionadasByTag()
    // NECESITAMOS : TAG - LENGUAJE - ID PAIS
    console.log(`Esta es la prueba de que el servicio de listar noticias puede llegar a funcionar.
    Vas a pedir noticias de un pais con Id${this.idPais},con el tag ${this.tag},en donde se habla en ${this.lenguaje}`);
    const data = await this.noticiasService.getNoticiasRelacionadasByTag(this.tag,this.lenguaje,this.idPais);
    if(data){
      this.noticias_relacionadas = data;
    }
    if(this.noticias_relacionadas.length==0){
      this.aviso_sin_noticias = 'No se han encontrado noticias relacionadas';
    }
  }
  
*/
