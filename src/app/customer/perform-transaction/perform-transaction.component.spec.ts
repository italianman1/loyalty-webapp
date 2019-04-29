import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformTransactionComponent } from './perform-transaction.component';

describe('PerformTransactionComponent', () => {
  let component: PerformTransactionComponent;
  let fixture: ComponentFixture<PerformTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
