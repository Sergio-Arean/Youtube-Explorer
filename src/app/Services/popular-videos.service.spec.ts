import { TestBed } from '@angular/core/testing';

import { PopularVideosService } from './popular-videos.service';

describe('PopularVideosService', () => {
  let service: PopularVideosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularVideosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
