import {TestBed} from '@angular/core/testing';

import {PrivateCalendarApiService} from './private-calendar-api.service';

describe('PrivateCalendarApiService', () => {
  let service: PrivateCalendarApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivateCalendarApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
