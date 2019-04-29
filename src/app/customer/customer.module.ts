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
import { LoyaltyProgramOverviewComponent } from './loyalty-program-overview/loyalty-program-overview.component';

@NgModule({
  declarations: [
    CustomerListComponent,
    JoinProgramComponent,
    TokenOverviewComponent,
    PointsEarnedBarChartComponent,
    PointsSpentBarChartComponent,
    PerformTransactionComponent,
    LoyaltyProgramOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule,

  ]
})
export class CustomerModule { }
