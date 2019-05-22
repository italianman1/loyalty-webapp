import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinProgramComponent } from './join-program/join-program.component';
import { TokenOverviewComponent } from './token-overview/token-overview.component';
import { LoyaltyProgramOverviewComponent } from './loyalty-program-overview/loyalty-program-overview.component';
import { PerformTransactionComponent } from './perform-transaction/perform-transaction.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    JoinProgramComponent,
    LoyaltyProgramOverviewComponent,
    TokenOverviewComponent,
    PerformTransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class CustomerModule { }
