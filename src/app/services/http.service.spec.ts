import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { Type } from '@angular/compiler';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpService<Type> = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
