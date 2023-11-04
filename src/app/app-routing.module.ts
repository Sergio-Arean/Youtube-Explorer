import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';
import { LlamadaPantallaFiltrosComponent } from './Components/llamada-pantalla-filtros/llamada-pantalla-filtros.component';
import { DetallesVideoComponent } from './Components/detalles-video/detalles-video.component';

const routes: Routes = [
  {path: 'home', component: MapaComponent},
  {path: 'ejemplo', component: EjemploComponent},
  //{path: 'paises/:idPais', component: BusquedaPorPaisComponent},
  {path: 'paises/:idPais/:cantidad/:categoria', component: BusquedaPorPaisComponent},
  {path: 'videos/:idVideo', component: DetallesVideoComponent}, //path reproduccion video

  //tomy routes:
  { path: 'home/pais/:nombrePais', component: LlamadaPantallaFiltrosComponent }
  /*  { path: 'home', component: MapaComponent },
 { path: 'home/pais/:nombrePais', component: LlamadaPantallaFiltrosComponent },
  { path: 'busqueda/:id', component: BusquedaPorPaisComponent }  ,
  { path: 'courses', component: CoursesComponent } */


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
