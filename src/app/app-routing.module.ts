import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';
import { LlamadaPantallaFiltrosComponent } from './Components/llamada-pantalla-filtros/llamada-pantalla-filtros.component';

const routes: Routes = [
  {path: 'home', component: MapaComponent},
  {path: 'ejemplo', component: EjemploComponent},
  {path: 'paises/:idPais', component: BusquedaPorPaisComponent},

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
