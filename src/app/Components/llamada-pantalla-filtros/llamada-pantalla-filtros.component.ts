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


  hacerClick() { //reformulacion del metodo: aca no necesita recibir algo por parametro
    this.router.navigate(['paises',this.idPais]);
  }


  
}
