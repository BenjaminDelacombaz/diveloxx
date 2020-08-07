import { TestBed } from '@angular/core/testing';

import { CanUpdateDiveGuard } from './can-update-dive.guard';

describe('CanUpdateDiveGuard', () => {
  let guard: CanUpdateDiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanUpdateDiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
