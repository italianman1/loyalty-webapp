import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyProgramOverviewComponent } from './loyalty-program-overview.component';

describe('LoyaltyProgramOverviewComponent', () => {
  let component: LoyaltyProgramOverviewComponent;
  let fixture: ComponentFixture<LoyaltyProgramOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyProgramOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyProgramOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
