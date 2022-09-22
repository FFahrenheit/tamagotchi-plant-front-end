import { TestBed } from '@angular/core/testing';

import { PlantStatusService } from './plant-status.service';

describe('PlantStatusService', () => {
  let service: PlantStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
