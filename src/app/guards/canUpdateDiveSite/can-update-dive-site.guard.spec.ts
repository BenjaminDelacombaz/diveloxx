import { TestBed } from '@angular/core/testing';

import { CanUpdateDiveSiteGuard } from './can-update-dive-site.guard';

describe('CanUpdateDiveSiteGuard', () => {
  let guard: CanUpdateDiveSiteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanUpdateDiveSiteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
