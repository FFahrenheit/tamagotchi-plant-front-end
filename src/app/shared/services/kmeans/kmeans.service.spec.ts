import { TestBed } from '@angular/core/testing';

import { KmeansService } from './kmeans.service';

describe('KmeansService', () => {
  let service: KmeansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KmeansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
