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
 

  mail_usuario_logueado: string = 'Ninguno';

  lista_resultados:Resultado[] = [];
  lista_resultados_a_mostrar:Resultado[] = [];
  resultados_cargados:boolean = false;
  //json:any[] = [];

  constructor(private autentificacionService: AutentificacionService,private historialBusquedaService: HistorialBusquedaService, private datosEspecificosPais:DatosEspecificosPaisesService, private router:Router){}

  ngOnInit(){

 this.mail_usuario_logueado = this.autentificacionService.emailUsuario() ; //transitorio 16-11
// this.mail_usuario_logueado = 'sergio.arean@gmail.com'; //comentarlo luego y poner linea de arriba
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
  if(json){
    
    historial.id = json.id,
    historial.resultados = json.resultados;
    if(historial.resultados!=undefined && historial.resultados.length>0){
      this.resultados_cargados = true;
      this.lista_resultados = historial.resultados.reverse(); //invertir arreglo para la vista
    }
    
  }
  
  }



  //funcion intermediaria para cargar resultados
  async getNombreEnCastellano(idPais:string){
    return await this.datosEspecificosPais.getNombreCastellanoByCode(idPais);
  }

  async getUrlImagenBandera(idPais:string){
    return await this.datosEspecificosPais.getBanderaByCode(idPais);
  }

  /*16-11*/ 
   async eliminarBusqueda(idResultado:string){
    alert(`Usted quiere eliminar el resultado con id ${idResultado}`);

    const data = await this.historialBusquedaService.eliminarUnaBusqueda(this.mail_usuario_logueado,idResultado); 
    if(data){
      this.borrarBusquedaVista(idResultado); //elimina vista
    }
    

    
    //this.lista_resultados 
  }

  borrarBusquedaVista(idResultado:string){
    for(let i:number=0;i<this.lista_resultados.length;i++){
        if(this.lista_resultados[i].id==idResultado){
          this.lista_resultados.splice(i,1);
          return;
        }
    }
  }



 async LimpiarHistorial(){
    const data = await this.historialBusquedaService.eliminarTodasLasBusquedas(this.mail_usuario_logueado);
    if(data){
      this.borrarTodasLasBusquedasVista();
      alert(`Las búsquedas han sido eliminadas exitosamente`);
      
    }
  }
  borrarTodasLasBusquedasVista(){
    this.lista_resultados.splice(0,this.lista_resultados.length);
    this.resultados_cargados = false;
  }

  async HayResultados(){
    await new Promise(resolve => setTimeout(resolve, 2000));
    return this.resultados_cargados;
  }



  VerBusquedasAnteriores(idResultado:string){
    this.router.navigate(['historial',this.mail_usuario_logueado,idResultado]);
  }

}
