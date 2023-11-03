import { TestBed } from '@angular/core/testing';

import { SharedDataMapaFiltrosService } from './shared-data-mapa-filtros.service';

describe('SharedDataMapaFiltrosService', () => {
  let service: SharedDataMapaFiltrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedDataMapaFiltrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
