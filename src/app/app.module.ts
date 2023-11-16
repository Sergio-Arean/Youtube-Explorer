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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialPageComponent } from './Pages/historial-page/historial-page.component';
import { BarraBusquedaComponent } from './Components/barra-busqueda/barra-busqueda.component';
import { RegistrarsePageComponent } from './Pages/registrarse-page/registrarse-page.component';
import {AngularFireModule} from '@angular/fire/compat';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

import { AuthGuard } from '@angular/fire/auth-guard';


const firebaseConfig = {
  apiKey: "AIzaSyD8_ZS7DKHeIXj8-5RYyk1VVDqg8P1X8fM",
  authDomain: "proyecto1-400800.firebaseapp.com",
  projectId: "proyecto1-400800",
  storageBucket: "proyecto1-400800.appspot.com",
  messagingSenderId: "677952469803",
  appId: "1:677952469803:web:92bde54182b119c753236e",
  measurementId: "G-Q3DSQS4VR1"
};

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
    RegistrarsePageComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
