import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapaComponent,
    EjemploComponent,
    BusquedaPorPaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
