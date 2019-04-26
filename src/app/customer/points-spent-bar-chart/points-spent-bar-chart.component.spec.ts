import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSpentBarChartComponent } from './points-spent-bar-chart.component';

describe('PointsSpentBarChartComponent', () => {
  let component: PointsSpentBarChartComponent;
  let fixture: ComponentFixture<PointsSpentBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsSpentBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsSpentBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
