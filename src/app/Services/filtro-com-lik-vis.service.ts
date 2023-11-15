import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltroComLikVisService {


  filtroComentarios: boolean = false;
  filtroLikes: boolean = false;
  filtroVistas: boolean = false;

  toggleFiltroComentarios() {
    this.filtroComentarios = true;
    this.filtroLikes = false;
    this.filtroVistas = false;
  }

  toggleFiltroLikes() {
    this.filtroLikes = true;
    this.filtroComentarios = false;
    this.filtroVistas = false;
  }

  toggleFiltroVistas() {
    this.filtroVistas = true;
    this.filtroComentarios = false;
    this.filtroLikes = false;
  }

  getComentarios()
  {
    return this.filtroComentarios;
  }

  getLikes(){
    return this.filtroLikes;
  }
  getVisualizaciones(){
    return this.filtroVistas;
  }



}
