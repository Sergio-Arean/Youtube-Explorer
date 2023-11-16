import { Component } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/Resultado';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import { Historial } from 'src/app/Interfaces/Historial';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.css']
})
export class HistorialPageComponent {
  //mail_usuario_logueado: string|null = null; //transitoriamente comentado
  mail_usuario_logueado: string = 'Ninguno';

  lista_resultados:Resultado[] = [];
  //json:any[] = [];

  constructor(
    private autentificacionService: AutentificacionService,
    private historialBusquedaService: HistorialBusquedaService, 
    private datosEspecificosPais:DatosEspecificosPaisesService, 
    private router:Router){}

  ngOnInit(){
    /*
        this.autentificacionService.user.subscribe(user => {
          if (user) {
            this.mail_usuario_logueado = user.email;
          } else {
            this.mail_usuario_logueado = null;
          }
        });*/ //esto es transitoriamente comentado, EQ es donde recibe el mail de quien esta logueado
      // this.cargarListaResultados(); //comentado porque esto es lo que estaba antes
    // this.mail_usuario_logueado = this.autentificacionService.getEmailUsuarioLogueado();
  this.mail_usuario_logueado = this.autentificacionService.emailUsuario() ;
  this.ConsologuearHistorialSegunUsuario();
  this.cargarListaResultadosII();
  }


  logout() {
    let rta:any = this.autentificacionService.logout();
    if(rta){
      this.autentificacionService.setUsuario(false,'');
      this.router.navigate(['/login']);
    }
  }

  /* sabado 11-11 */
  async ConsologuearHistorialSegunUsuario(){
    let historial:Historial = {
      id: '',
      resultados: []
    };

    const json:any = await this.historialBusquedaService.getBusquedasSegunUsuario(this.mail_usuario_logueado); //envaimos a sergio
    console.log(`Este es el json que recibe la page: `, json);
    if(json!=null){
      historial.id = json.id,
      historial.resultados = json.resultados;
    }
    console.log(historial);
  }


  //ok, si los podemos consologuear, los vamos a listar.
  /**ngFor="let video of lista_videos */
 async cargarListaResultadosII(){
  let historial:Historial = {
    id: '',
    resultados: []
  };  
  
  const json:any = await this.historialBusquedaService.getBusquedasSegunUsuario(this.mail_usuario_logueado); //envaimos a sergio
  console.log(`Este es el json que recibe la page: `, json);
   if(json!=null){
      historial.id = json.id,
      historial.resultados = json.resultados;
      this.lista_resultados = historial.resultados;
    }
  }

  
  //funcion intermediaria para cargar resultados
  async getNombreEnCastellano(idPais:string){
    return await this.datosEspecificosPais.getNombreCastellanoByCode(idPais);
  }

  async getUrlImagenBandera(idPais:string){
    return await this.datosEspecificosPais.getBanderaByCode(idPais);
  }

}


  /* A BORRAR
  
  async cargarListaResultados(){
    let json =  await this.historialBusquedaService.getHistorial();
    json.forEach((item:any)=>{
      const resultado:Resultado = {
        id:item.id,
        fecha:item.fecha,
        hora:item.hora,
        pais:item.pais,
        cantidad:item.cantidad,
        categoria:item.categoria,
        videos: item.videos //con esto alcanzara?
      }
      console.log(`Consologueando el item:`);
      console.log(item);
      this.lista_resultados.push(resultado);
      
  });

  //a esta altura, la lista de resultados esta ok...
  console.log(`Lista de Resultados desde HISTORIAL PAGE COMPONENT:`);
  console.log(this.lista_resultados);

  }*/