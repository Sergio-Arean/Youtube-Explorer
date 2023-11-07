import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';
import { LlamadaPantallaFiltrosComponent } from './Components/llamada-pantalla-filtros/llamada-pantalla-filtros.component';
import { DetallesVideoComponent } from './Components/detalles-video/detalles-video.component';
import { FormsModule } from '@angular/forms';
import { HistorialPageComponent } from './Pages/historial-page/historial-page.component';
import { BarraBusquedaComponent } from './Components/barra-busqueda/barra-busqueda.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapaComponent,
    EjemploComponent,
    BusquedaPorPaisComponent,
    LlamadaPantallaFiltrosComponent,
    DetallesVideoComponent,
    HistorialPageComponent,
    BarraBusquedaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
