import { Component } from '@angular/core';
import { PaisService } from 'src/app/Services/busqueda-pais.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  searchQuery: string = '';
  suggestions: string[] = [];

  private searchTerms = new Subject<string>();

  constructor(private paisService: PaisService) {
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
    this.searchQuery = suggestion;
    this.suggestions = []; // Limpia la lista de sugerencias después de seleccionar una
  }
  


}
