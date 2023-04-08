import { TestBed } from '@angular/core/testing';

import { FilterByDateService } from './filter-by-date.service';

describe('FilterByDateService', () => {
  let service: FilterByDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterByDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
