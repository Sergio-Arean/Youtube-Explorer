//mapa. ts antes de manipularlo como loco:
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from 'src/app/Interfaces/Pais';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';
import { PopularVideosService } from 'src/app/Services/popular-videos.service';
import { RedireccionUrlPantallaFiltrosService } from 'src/app/Services/redireccion-url-pantalla-filtros.service';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {

  /*seccion hover pais*/
  nombre_pais_hover:string='';
  pais_disponible:boolean = true;
  url_bandera_pais_hover:string='';
   
    pais_hovereado:Pais = {
      nombre_castellano : 'NOMBRE DEFINIDO EN OBJETO LITERAL',
      url_bandera: ''
    };
  






  isComponentOpen: boolean = false;

  constructor(private router: Router,    private redireccionUrlPantallaFiltrosService: RedireccionUrlPantallaFiltrosService,
    private sharedDataService: SharedDataMapaFiltrosService, private datosEspecificos: DatosEspecificosPaisesService, private popularVideos:PopularVideosService){

          // Verifica si la ruta actual es la raíz '/'
    if (this.router.url === '/') {
      // Redirige a la página de inicio si se accede a la ruta raíz
      this.router.navigate(['/home']);
    }

    // Resto de la lógica en el constructor, incluyendo otros servicios inyectados
    }


    /*METODOS HOVER PAIS*/
    async hoverEnPais(event: any){ //metodo que gestiona la relacion entre el evento hover y el pais seleccionado
      let id_pais:string = '';
      id_pais = event.target.id; 
      //this.nombre_pais_hover= this.paisService.getPaisPorAbreviatura(id_pais); //trae nombre de pais
      /*la linea de arriba comentada transitoriamente para probar lo siguiente:*/ 
      this.pais_hovereado = await this.datosEspecificos.getPaisByCode(id_pais); //llamada api
      console.log(`El objeto pais que recibe el componente es este:`,this.pais_hovereado);

      this.nombre_pais_hover = this.pais_hovereado.nombre_castellano; 
      this.url_bandera_pais_hover = this.pais_hovereado.url_bandera;
  
      this.pais_disponible = this.popularVideos.isDisponible(id_pais); //cambia color de mapa
      
    }
  

    /*FIN SECCION METODOS HOVER PAIS*/





    onMapClick(event: MouseEvent) {
      // Obtén las coordenadas del clic
      const x = event.clientX;
      const y = event.clientY;
    
      // Obtén el elemento SVG en las coordenadas del clic
      const clickedElement = document.elementFromPoint(x, y);
    
      // Comprueba si el elemento es un <path> (área del país)
      if (clickedElement instanceof SVGPathElement) {
        // Obtén el ID del país desde el atributo "id"
        const country = clickedElement.getAttribute('title');
  
        console.log("PAIS CLICKEADO = " + country);
  
        const countryId = clickedElement.getAttribute('id');
  
  
        if (countryId !== null && country != null) { // se verifica que el id del pais no es null
          //this.redireccionUrlPantallaFiltrosService.navegarAlUrlFiltros(countryId)
  
          this.sharedDataService.setNombrePais(country) //le pasamos la variable country a un servicio que tambie usa la pantalla de filtros
          this.sharedDataService.setNIdPais(countryId)
  
          
          /*inicio adaptacion para validar pais disponible*/ 
          if(!this.popularVideos.isDisponible(countryId)){
            //console.log(`id enviado a is disponible: ${idPais}`);
            alert(`La informacion sobre el pais seleccionado no esta disponible`);
          }else{
            this.router.navigate(['/home/pais', country]);
            this.isComponentOpen = false; //con true se pone borroso el mapa
          }
          /*fin adaptacion para validar pais disponible*/ 

          /*
          this.router.navigate(['/home/pais', country]);
          this.isComponentOpen = false; //con true se pone borroso el mapa*/
  
        }
  
      }
    }
  
    onClose() { //para sacar lo borroso, aca tambien verificamos que la ventana de filtros se cerro
      this.isComponentOpen = false; // Cambiar el valor cuando se cierre la pantalla de filtros
    }

    /*fin tomy functions*/

  hacerClick(event: MouseEvent) {
    const idPais = (event.target as HTMLDivElement).id;
    //alert(`Se hizo clic en el div con ID: ${idPais}`);
    //this.router.navigate(['busqueda', id]); 
    //this.router.navigate(['courses', id]);  //lo comento pero es una prueba que funca perfecto
    if(!this.popularVideos.isDisponible(idPais)){
      console.log(`id enviado a is disponible: ${idPais}`);
      alert(`La informacion sobre ${this.pais_hovereado} no esta disponible`);
    }else{
      this.router.navigate(['paises', idPais]);
    }
    
  }


  /*SABADO 04-11: Adaptando metodo OnmAPcCLIK para pasar a la pantalla de busqueda por pais
  clickeado usando pantalla tomy filtros*/
  onMapClickII(event: MouseEvent) {
    // Obtén las coordenadas del clic
    const x = event.clientX;
    const y = event.clientY;
  
    // Obtén el elemento SVG en las coordenadas del clic
    const clickedElement = document.elementFromPoint(x, y);
  
    // Comprueba si el elemento es un <path> (área del país)
    if (clickedElement instanceof SVGPathElement) {
      // Obtén el ID del país desde el atributo "id"
      const country = clickedElement.getAttribute('title');

      console.log("PAIS CLICKEADO = " + country);

      const countryId = clickedElement.getAttribute('id');


      if (countryId !== null && country != null) { // se verifica que el id del pais no es null
        //this.redireccionUrlPantallaFiltrosService.navegarAlUrlFiltros(countryId)

        this.sharedDataService.setNombrePais(country) //le pasamos la variable country a un servicio que tambie usa la pantalla de filtros
        this.sharedDataService.setNIdPais(countryId)


        /*adaptacion para redireccion a busqueda-por-pais:*/
       const idPais = (event.target as HTMLDivElement).id;
        this.router.navigate(['paises', idPais]);
        /* fin adaptacion para redireccion a busqueda-por-pais:*/
        this.isComponentOpen = false; //con true se pone borroso el mapa

      }

    }
  }





}

