import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private paises: { nombre: string, abreviatura: string }[] = [
    { nombre: 'Argentina', abreviatura: 'AR' },
    { nombre: 'Brasil', abreviatura: 'BR' },
    { nombre: 'Chile', abreviatura: 'CL' },
    { nombre: 'Colombia', abreviatura: 'CO' },
    // Otros países aquí
  ];

  searchPaises(term: string): Observable<string[]> {
    term = term.toLowerCase();
    const suggestions = this.paises
      .filter(pais => pais.nombre.toLowerCase().includes(term))
      .map(pais => pais.nombre);
    return of(suggestions);
  }
}
