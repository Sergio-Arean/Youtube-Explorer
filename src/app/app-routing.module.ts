import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';

const routes: Routes = [
  {path: 'home', component: MapaComponent},
  {path: 'ejemplo', component: EjemploComponent},
  {path: 'paises/:idPais', component: BusquedaPorPaisComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
