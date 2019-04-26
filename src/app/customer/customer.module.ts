import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { JoinProgramComponent } from './join-program/join-program.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PointsEarnedBarChartComponent } from './points-earned-bar-chart/points-earned-bar-chart.component';
import { TokenOverviewComponent } from './token-overview/token-overview.component';
import { PointsSpentBarChartComponent } from './points-spent-bar-chart/points-spent-bar-chart.component';
import { PerformTransactionComponent } from './perform-transaction/perform-transaction.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    JoinProgramComponent,
    TokenOverviewComponent,
    PointsEarnedBarChartComponent,
    PointsSpentBarChartComponent,
    PerformTransactionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,

  ]
})
export class CustomerModule { }
