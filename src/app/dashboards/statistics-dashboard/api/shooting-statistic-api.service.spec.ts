import {TestBed} from '@angular/core/testing';

import {ShootingStatisticApiService} from './shooting-statistic-api.service';

describe('ShootingSTatisticServiceService', () => {
  let service: ShootingStatisticApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShootingStatisticApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
