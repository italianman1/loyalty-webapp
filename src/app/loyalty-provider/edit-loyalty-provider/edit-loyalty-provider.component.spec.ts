import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoyaltyProviderComponent } from './edit-loyalty-provider.component';

describe('EditLoyaltyProviderComponent', () => {
  let component: EditLoyaltyProviderComponent;
  let fixture: ComponentFixture<EditLoyaltyProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLoyaltyProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoyaltyProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
