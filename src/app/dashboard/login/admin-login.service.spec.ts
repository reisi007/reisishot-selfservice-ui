import {TestBed} from '@angular/core/testing';

import {AdminLoginDataService} from './admin-login-data.service';

describe('AdminLoginService', () => {
  let service: AdminLoginDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminLoginDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
