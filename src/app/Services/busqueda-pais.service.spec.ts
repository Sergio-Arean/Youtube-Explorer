import { TestBed } from '@angular/core/testing';

import { BusquedaPaisService } from './busqueda-pais.service';

describe('BusquedaPaisService', () => {
  let service: BusquedaPaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaPaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
