import { Component, importProvidersFrom } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';



@Component({
  selector: 'app-llamada-pantalla-filtros',
  templateUrl: './llamada-pantalla-filtros.component.html',
  styleUrls: ['./llamada-pantalla-filtros.component.css']
})
export class LlamadaPantallaFiltrosComponent {

  nombrePais!:string;
  idPais!:string;


  
  
  constructor(private router: Router, private sharedData: SharedDataMapaFiltrosService)
  {
    this.idPais = this.sharedData.getIdPais();
    this.nombrePais = this.sharedData.getNombrePais();
  }




  redirectToHome() { //para cerrar la ventana de los filtros
    this.router.navigate(['/home']);
  }


  
}
