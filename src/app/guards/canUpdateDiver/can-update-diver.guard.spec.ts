import { TestBed } from '@angular/core/testing';

import { CanUpdateDiverGuard } from './can-update-diver.guard';

describe('CanUpdateDiverGuard', () => {
  let guard: CanUpdateDiverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanUpdateDiverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
