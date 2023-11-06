import { TestBed } from '@angular/core/testing';

import { HistorialBusquedaService } from './historial-busqueda.service';

describe('HistorialBusquedaService', () => {
  let service: HistorialBusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialBusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
