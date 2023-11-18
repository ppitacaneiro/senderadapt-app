import { TestBed } from '@angular/core/testing';

import { HickingtrailService } from './hickingtrail.service';

describe('HickingtrailService', () => {
  let service: HickingtrailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HickingtrailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
