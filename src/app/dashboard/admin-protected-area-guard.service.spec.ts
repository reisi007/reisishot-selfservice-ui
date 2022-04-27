import {TestBed} from '@angular/core/testing';

import {AdminProtectedAreaGuardService} from './admin-protected-area-guard.service';

describe('AdminProtectedAreaGuardService', () => {
  let service: AdminProtectedAreaGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProtectedAreaGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
