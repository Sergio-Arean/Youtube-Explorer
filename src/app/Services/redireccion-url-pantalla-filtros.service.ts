import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedireccionUrlPantallaFiltrosService {

  constructor(private router: Router) { }

  navegarAlUrlFiltros(id:String){

    this.router.navigate([`/pais/${id}`])
  }
}
//servicio que redirecciona a la url para poder mostrar la pantalla de filtros.
