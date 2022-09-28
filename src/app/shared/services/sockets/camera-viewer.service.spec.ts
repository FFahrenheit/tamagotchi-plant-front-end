import { TestBed } from '@angular/core/testing';

import { CameraViewerService } from './camera-viewer.service';

describe('CameraViewerService', () => {
  let service: CameraViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
