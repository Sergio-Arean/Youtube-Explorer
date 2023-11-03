import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  constructor(private router: Router){}

  hacerClick(event: MouseEvent) {
    const idPais = (event.target as HTMLDivElement).id;
    //alert(`Se hizo clic en el div con ID: ${idPais}`);
    //this.router.navigate(['busqueda', id]); 
    //this.router.navigate(['courses', id]);  //lo comento pero es una prueba que funca perfecto
    this.router.navigate(['paises', idPais]);
  }

}
