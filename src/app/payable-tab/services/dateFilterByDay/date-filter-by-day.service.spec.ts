import { TestBed } from '@angular/core/testing';

import { DateFilterByDayService } from './date-filter-by-day.service';

describe('DateFilterByDayService', () => {
  let service: DateFilterByDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFilterByDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
