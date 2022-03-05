import {TestBed} from '@angular/core/testing';

import {ShootingDateApiService} from './shooting-date-api.service';

describe('ShootingDateApiService', () => {
  let service: ShootingDateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShootingDateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
