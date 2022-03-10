import {TestBed} from '@angular/core/testing';

import {CalendarApiService} from './calendar-api.service';

describe('ShootingDateApiService', () => {
  let service: CalendarApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
