import { TestBed } from '@angular/core/testing';

import { SolutionproviderService } from './solutionprovider.service';

describe('SolutionproviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SolutionproviderService = TestBed.get(SolutionproviderService);
    expect(service).toBeTruthy();
  });
});
