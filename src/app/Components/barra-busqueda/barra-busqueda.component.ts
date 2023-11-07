import { Component } from '@angular/core';
import { PaisService } from 'src/app/Services/busqueda-pais.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { RedireccionUrlPantallaFiltrosService } from 'src/app/Services/redireccion-url-pantalla-filtros.service';
import { SharedDataMapaFiltrosService } from 'src/app/Services/shared-data-mapa-filtros.service';



@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  searchQuery: string = '';
  suggestions: string[] = [];


  private searchTerms = new Subject<string>();



  constructor(private paisService: PaisService, private router: Router,
    private redireccionUrlPantallaFiltrosService: RedireccionUrlPantallaFiltrosService,
    private sharedDataService: SharedDataMapaFiltrosService) {



    this.searchTerms
      .pipe(
        debounceTime(100), // Espera 100ms después de que el usuario deje de escribir
        distinctUntilChanged(), // Ignora si el término de búsqueda no ha cambiado
        switchMap((term: string) => this.paisService.searchPaises(term))
      )
      .subscribe((paises: string[]) => {
        this.suggestions = paises;
      });
  }

  search() {
    this.searchTerms.next(this.searchQuery);
  }

  selectSuggestion(suggestion: string): void {
    const selectedPais = this.paisService.paises.find(pais => pais.nombre === suggestion);
    if (selectedPais) {
      const abreviatura = selectedPais.abreviatura;
  
      this.searchQuery = suggestion;
  
      this.sharedDataService.setNombrePais(suggestion);
      this.sharedDataService.setNIdPais(abreviatura);
  
      this.router.navigate(['/home/pais', suggestion]);
  
      this.suggestions = [];
    }
  }
  


}
