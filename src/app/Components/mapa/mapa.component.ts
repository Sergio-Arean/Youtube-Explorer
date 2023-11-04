import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RedireccionUrlPantallaFiltrosService } from 'src/app/Services/redireccion-url-pantalla-filtros.service';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {

  isComponentOpen: boolean = false;

  constructor(private router: Router,    private redireccionUrlPantallaFiltrosService: RedireccionUrlPantallaFiltrosService,
    private sharedDataService: SharedDataMapaFiltrosService){

          // Verifica si la ruta actual es la raíz '/'
    if (this.router.url === '/') {
      // Redirige a la página de inicio si se accede a la ruta raíz
      this.router.navigate(['/home']);
    }

    // Resto de la lógica en el constructor, incluyendo otros servicios inyectados
    }

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
  
  
          this.router.navigate(['/home/pais', country]);
          this.isComponentOpen = false; //con true se pone borroso el mapa
  
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
    this.router.navigate(['paises', idPais]);
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
