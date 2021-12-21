import { TestBed } from '@angular/core/testing';

import { InmemorydataService } from './inmemorydata.service';

describe('InmemorydataService', () => {
  let service: InmemorydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InmemorydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
