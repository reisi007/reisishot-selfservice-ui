import {TestBed} from '@angular/core/testing';

import {Mail2DiskService} from './mail2-disk.service';

describe('Mail2DiskService', () => {
  let service: Mail2DiskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mail2DiskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
