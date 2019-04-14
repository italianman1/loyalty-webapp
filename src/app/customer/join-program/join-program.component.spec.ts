import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinProgramComponent } from './join-program.component';

describe('JoinProgramComponent', () => {
  let component: JoinProgramComponent;
  let fixture: ComponentFixture<JoinProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
