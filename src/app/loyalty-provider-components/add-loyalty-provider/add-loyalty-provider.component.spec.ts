import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoyaltyProviderComponent } from './add-loyalty-provider.component';

describe('AddLoyaltyProviderComponent', () => {
  let component: AddLoyaltyProviderComponent;
  let fixture: ComponentFixture<AddLoyaltyProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLoyaltyProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoyaltyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
