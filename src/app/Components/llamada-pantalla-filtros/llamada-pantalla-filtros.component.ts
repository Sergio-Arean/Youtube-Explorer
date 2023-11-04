import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RedireccionUrlPantallaFiltrosService } from 'src/app/Services/redireccion-url-pantalla-filtros.service';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';



@Component({
  selector: 'app-llamada-pantalla-filtros',
  templateUrl: './llamada-pantalla-filtros.component.html',
  styleUrls: ['./llamada-pantalla-filtros.component.css']
})
export class LlamadaPantallaFiltrosComponent {

  nombrePais!:string;
  idPais!:string;


  
  
  constructor(private router: Router, private sharedData: SharedDataMapaFiltrosService,
              private redireccionUrlPantallaFiltrosService: RedireccionUrlPantallaFiltrosService,)
  {
    this.idPais = this.sharedData.getIdPais();
    this.nombrePais = this.sharedData.getNombrePais();
  }




  redirectToHome() { //para cerrar la ventana de los filtros
    this.router.navigate(['/home']);
  }


  hacerClick(event: MouseEvent) {
    const idPais = (event.target as HTMLDivElement).id;
    //alert(`Se hizo clic en el div con ID: ${idPais}`);
    //this.router.navigate(['busqueda', id]); 
    //this.router.navigate(['courses', id]);  //lo comento pero es una prueba que funca perfecto
    this.router.navigate(['paises', idPais]);
  }


  
}
