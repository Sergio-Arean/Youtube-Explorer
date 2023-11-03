import { TestBed } from '@angular/core/testing';

import { RedireccionUrlPantallaFiltrosService } from './redireccion-url-pantalla-filtros.service';

describe('RedireccionUrlPantallaFiltrosService', () => {
  let service: RedireccionUrlPantallaFiltrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedireccionUrlPantallaFiltrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
