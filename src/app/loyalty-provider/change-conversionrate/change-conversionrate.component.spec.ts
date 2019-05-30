import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeConversionrateComponent } from './change-conversionrate.component';

describe('ChangeConversionrateComponent', () => {
  let component: ChangeConversionrateComponent;
  let fixture: ComponentFixture<ChangeConversionrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeConversionrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeConversionrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
