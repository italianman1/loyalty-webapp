import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsEarnedBarChartComponent } from './points-earned-bar-chart.component';

describe('PointsEarnedBarChartComponent', () => {
  let component: PointsEarnedBarChartComponent;
  let fixture: ComponentFixture<PointsEarnedBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsEarnedBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsEarnedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
