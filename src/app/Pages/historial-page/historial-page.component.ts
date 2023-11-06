import { Component } from '@angular/core';
import { Resultado } from 'src/app/Interfaces/Resultado';
import { HistorialBusquedaService } from 'src/app/Services/historial-busqueda.service';

@Component({
  selector: 'app-historial-page',
  templateUrl: './historial-page.component.html',
  styleUrls: ['./historial-page.component.css']
})
export class HistorialPageComponent {
  lista_resultados:Resultado[] = [];
  //json:any[] = [];

  constructor(private historialBusquedaService: HistorialBusquedaService){}

  ngOnInit(){
   this.cargarListaResultados();
  }

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

  }
}
