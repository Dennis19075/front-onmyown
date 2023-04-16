import { TestBed } from '@angular/core/testing';

import { RefreshPayableService } from './refresh-payable.service';

describe('RefreshPayableService', () => {
  let service: RefreshPayableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshPayableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
