import { TestBed } from '@angular/core/testing';

import { DiveSiteService } from './dive-site.service';

describe('DiveSiteService', () => {
  let service: DiveSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiveSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
