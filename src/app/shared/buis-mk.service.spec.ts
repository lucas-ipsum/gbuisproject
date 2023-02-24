import { TestBed } from '@angular/core/testing';

import { BuisMkService } from './buis-mk.service';

describe('BuisMkService', () => {
  let service: BuisMkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuisMkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
