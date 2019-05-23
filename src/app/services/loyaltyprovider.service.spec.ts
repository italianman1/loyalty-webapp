import { TestBed } from '@angular/core/testing';

import { LoyaltyproviderService } from './loyaltyprovider.service';

describe('LoyaltyproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoyaltyproviderService = TestBed.get(LoyaltyproviderService);
    expect(service).toBeTruthy();
  });
});
