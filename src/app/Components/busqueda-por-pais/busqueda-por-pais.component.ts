import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //nos permite recuperar parametros que llegan por url

@Component({
  selector: 'app-busqueda-por-pais',
  templateUrl: './busqueda-por-pais.component.html',
  styleUrls: ['./busqueda-por-pais.component.css']
})
export class BusquedaPorPaisComponent {
  idPais:string = '';
  constructor(private route: ActivatedRoute){

  }

  ngOnInit(){
    this.route.params.subscribe(params => this.idPais = params['idPais']);
    //con esto especifico que hago con el parametro
  }

}
