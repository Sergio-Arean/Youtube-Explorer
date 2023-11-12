import { TestBed } from '@angular/core/testing';

import { FiltroComLikVisService } from './filtro-com-lik-vis.service';

describe('FiltroComLikVisService', () => {
  let service: FiltroComLikVisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroComLikVisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
