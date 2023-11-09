import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './Components/mapa/mapa.component';
import { EjemploComponent } from './Components/ejemplo/ejemplo.component';
import { BusquedaPorPaisComponent } from './Components/busqueda-por-pais/busqueda-por-pais.component';
import { LlamadaPantallaFiltrosComponent } from './Components/llamada-pantalla-filtros/llamada-pantalla-filtros.component';
import { DetallesVideoComponent } from './Components/detalles-video/detalles-video.component';
import { HistorialPageComponent } from './Pages/historial-page/historial-page.component';
import { BarraBusquedaComponent } from './Components/barra-busqueda/barra-busqueda.component';
import { RegistrarsePageComponent } from './Pages/registrarse-page/registrarse-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

const routes: Routes = [
  {path: 'home', component: MapaComponent},
  {path: 'ejemplo', component: EjemploComponent},
  //{path: 'paises/:idPais', component: BusquedaPorPaisComponent},
  {path: 'paises/:idPais/:cantidad/:categoria', component: BusquedaPorPaisComponent},
  {path: 'videos/:idVideo', component: DetallesVideoComponent}, //path reproduccion video
  {path: 'home/busqueda', component: BarraBusquedaComponent },

  //tomy routes:
  { path: 'home/pais/:nombrePais', component: LlamadaPantallaFiltrosComponent },
  /*  { path: 'home', component: MapaComponent },
 { path: 'home/pais/:nombrePais', component: LlamadaPantallaFiltrosComponent },
  { path: 'busqueda/:id', component: BusquedaPorPaisComponent }  ,
  { path: 'courses', component: CoursesComponent } */

  //historial de busqueda
  { path: 'historial', component: HistorialPageComponent },


  //registrarse
  { path: 'registrarse', component: RegistrarsePageComponent },

  //loguearse
  { path: 'login', component: LoginPageComponent}
  
  /*lo que sigue lo dejo comentado por el momento, va a servir para restringir
  acceso a aquellos que ingresen y no esten logueados
  La cosa es asi: cuando el usuario vaya a "Mi cuenta", por lo que es
  la app, va a ser para ir al HISTORIAL. Entonces, al menos por ahora,
  ir a "Mi cuenta" es lo mismo que querer ir al historial... ya q x el momento,
  tener una cuenta implica solo contar con un historial.

  Situacion 1. Usuario ingresa, no esta logueado y pulsa "Mi cuenta":
    1) sera redirigido a registrarse, si antes no se registro
    2) inicia sesion. una vez ingresado, accede al historial 
    
  Situacion 2. Usuario YA LOGUEADO ingresa a mi cuenta:
   1) accede a historial
   
   Entonces, la cosa es asi: hay una page para registrarse, otra para iniciar sesion y 
   otra para acceder al historial.
   La idea es que haya una RESTRICCION.
   - Si estoy logueado, al acceder a "Mi cuenta" accedo al historial
   - Si no estoy logueado, al acceder a "Mi cuenta", el canActivate me redirecciona
   a Iniciar Sesion.
   (Recordar que pantalla de inicio sesion, si no tengo cuenta, me da la posibilidad
    de registrarme).

    Entonces, lo que va a ser en el futuro codigo descomentado sera:
    1) el siguiente import en esta pagina : 
    import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

    2) Por otro lado, en esta misma pagina, el path protegido:
    { path: 'pathalhistorial',
      component: componenteDelHistorial,
      ...canActivate(()=>redirectUnauthorizedTo(['/pathAlregistro']))}
   
   */

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
