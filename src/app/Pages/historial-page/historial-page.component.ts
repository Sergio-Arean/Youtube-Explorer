import { Component } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/Resultado';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';
import { AutentificacionService } from 'src/app/Services/autentificacion.service';
import { Historial } from 'src/app/Interfaces/Historial';
import { DatosEspecificosPaisesService } from 'src/app/Services/datos-especificos-paises.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.css']
})
export class HistorialPageComponent {
 

  mail_usuario_logueado: string = 'Ninguno';

  lista_resultados:Resultado[] = [];
  lista_resultados_a_mostrar:Resultado[] = [];
  mostrar_loading:boolean = true;
  historial_vacio:boolean = false;


  constructor(
    private autentificacionService: AutentificacionService,
    private historialBusquedaService: HistorialBusquedaService, 
    private datosEspecificosPais:DatosEspecificosPaisesService, 
    private router:Router){}

  ngOnInit(){

 this.mail_usuario_logueado = this.autentificacionService.emailUsuario() ; 
  this.cargarListaResultadosII();

  }


  logout() {
    let rta:any = this.autentificacionService.logout();
    if(rta){
      this.autentificacionService.setUsuario(false,'');
      this.router.navigate(['/login']);
    }
  }



 
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

 async cargarListaResultadosII(){
  let historial:Historial = {
    id: '',
    resultados: []
  };  
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  const json:any = await this.historialBusquedaService.getBusquedasSegunUsuario(this.mail_usuario_logueado); //envaimos a sergio
  console.log(`Este es el json que recibe la page: `, json);
  if(json){
    
    historial.id = json.id,
    historial.resultados = json.resultados;
    if(historial.resultados!=undefined){
        if(historial.resultados.length>0){
          this.mostrar_loading = false; //si tengo resultados , no muestro el loading
          this.lista_resultados = historial.resultados.reverse(); //invertir arreglo para la vista
        }else if(historial.resultados.length==0){
          this.mostrar_loading = false;
          this.historial_vacio = true;
        }
    }  
      
    }
    
  }
  
  



  
  async getNombreEnCastellano(idPais:string){
    return await this.datosEspecificosPais.getNombreCastellanoByCode(idPais);
  }

  async getUrlImagenBandera(idPais:string){
    return await this.datosEspecificosPais.getBanderaByCode(idPais);
  }

  
   async eliminarBusqueda(idResultado:string){


    const data = await this.historialBusquedaService.eliminarUnaBusqueda(this.mail_usuario_logueado,idResultado); 
    if(data){
      this.borrarBusquedaVista(idResultado); //elimina vista
      if(this.lista_resultados.length==0){
        this.historial_vacio=true;
      }
    } 
    

    
    
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
  if(this.lista_resultados.length==0){
    Swal.fire("El historial ya está vacío!");
    return;
  }
  Swal.fire({
    title: "Estás seguro?",
    text: "Se eliminará el historial de todas tus búsquedas",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText:"Cancelar",
    confirmButtonText: "Sí, borrar historial"
  }).then((result) => {
    if (result.isConfirmed) {
      this.historialBusquedaService.eliminarTodasLasBusquedas(this.mail_usuario_logueado)
        .then(()=>{
          this.borrarTodasLasBusquedasVista();
          this.historial_vacio = true;
          Swal.fire({
            title: "Hecho!",
            text: "Se ha limpiado el historial de búsqueda",
            icon: "success"
          });

        }).catch(e=>{
            console.log(`Error al intentar limpiar historial`)
        });

    }
  });  
  

  }
  borrarTodasLasBusquedasVista(){
    this.lista_resultados.splice(0,this.lista_resultados.length);
    
  }





  VerBusquedasAnteriores(idResultado:string,idPais:string){
    this.router.navigate(['historial',this.mail_usuario_logueado,idResultado,idPais]);
  }

}
