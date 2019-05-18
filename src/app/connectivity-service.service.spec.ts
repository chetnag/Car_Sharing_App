import { TestBed } from '@angular/core/testing';

import { ConnectivityServiceService } from './connectivity-service.service';

describe('ConnectivityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectivityServiceService = TestBed.get(ConnectivityServiceService);
    expect(service).toBeTruthy();
  });
});
