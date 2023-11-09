import { TestBed } from '@angular/core/testing';

import { DatosEspecificosPaisesService } from './datos-especificos-paises.service';

describe('DatosEspecificosPaisesService', () => {
  let service: DatosEspecificosPaisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEspecificosPaisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
