import { TestBed } from '@angular/core/testing';

import { GetTotalOutcomesService } from './get-total-outcomes.service';

describe('GetTotalOutcomesService', () => {
  let service: GetTotalOutcomesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTotalOutcomesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
