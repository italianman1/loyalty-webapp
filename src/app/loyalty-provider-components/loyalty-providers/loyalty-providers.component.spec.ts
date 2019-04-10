import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyProvidersComponent } from './loyalty-providers.component';

describe('LoyaltyProvidersComponent', () => {
  let component: LoyaltyProvidersComponent;
  let fixture: ComponentFixture<LoyaltyProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
