import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RedireccionUrlPantallaFiltrosService } from 'src/app/Services/redireccion-url-pantalla-filtros.service';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';
import { FiltroComLikVisService } from 'src/app/Services/filtro-com-lik-vis.service';


@Component({
  selector: 'app-llamada-pantalla-filtros',
  templateUrl: './llamada-pantalla-filtros.component.html',
  styleUrls: ['./llamada-pantalla-filtros.component.css']
})

export class LlamadaPantallaFiltrosComponent {
  nombrePais!:string;
  idPais!:string;

  cantidad:number = 5;/*agregado 04-11*/
  categoria:string = '25';/*agregado 04-11*/

  filtroActivo: string = '';

  
  constructor(
    private router: Router, 
    private sharedData: SharedDataMapaFiltrosService,
    private redireccionUrlPantallaFiltrosService: RedireccionUrlPantallaFiltrosService, 
    private filtroService: FiltroComLikVisService,)
  {
    this.idPais = this.sharedData.getIdPais();
    this.nombrePais = this.sharedData.getNombrePais();
  }

  redirectToHome() { //para cerrar la ventana de los filtros
    this.router.navigate(['/home']);
  }


  hacerClick() { //reformulacion del metodo: aca no necesita recibir algo por parametro
    //this.router.navigate(['paises',this.idPais,this.cantidad,this.categoria]);
    this.router.navigate(['paises',this.idPais,this.cantidad,this.categoria]);
  }


  cambiarFiltroComentarios() {
    this.actualizarFiltroActivo('comentarios');
    this.filtroService.toggleFiltroComentarios();

    console.log("CAMBIE A COMENTARIOS")
    console.log(this.filtroService.getComentarios())
    console.log(this.filtroService.getLikes())
    console.log(this.filtroService.getVisualizaciones())
  }

  cambiarFiltroLikes() {
    this.actualizarFiltroActivo('likes');
    this.filtroService.toggleFiltroLikes();
    console.log("CAMBIE A LIKES")
    console.log(this.filtroService.getLikes())
    console.log(this.filtroService.getComentarios())
    console.log(this.filtroService.getVisualizaciones())
  }

  cambiarFiltroVistas() {
    this.actualizarFiltroActivo('vistas');
    this.filtroService.toggleFiltroVistas();
    console.log("CAMBIE A VISUALIZACIONES")
    console.log(this.filtroService.getVisualizaciones())
    console.log(this.filtroService.getLikes())
    console.log(this.filtroService.getComentarios())
  }

  // Nueva función para actualizar el filtro activo
  private actualizarFiltroActivo(filtro: string) {
    this.filtroActivo = filtro;
  }

  // Nueva función para verificar el estado del filtro activo
  esFiltroActivo(filtro: string): boolean {
    return this.filtroActivo === filtro;
  }
}
