import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinProgramComponent } from './join-program/join-program.component';
import { LoyaltyProgramOverviewComponent } from './loyalty-program-overview/loyalty-program-overview.component';
import { TokenOverviewComponent } from './token-overview/token-overview.component';
import { PerformTransactionComponent } from './perform-transaction/perform-transaction.component';

const routes: Routes = [
  { path: 'customer/join-program', component: JoinProgramComponent },
  { path: 'customer/program-overview', component: LoyaltyProgramOverviewComponent},
  { path: 'customer/token-overview', component: TokenOverviewComponent},
  { path: 'customer/perform-transaction', component: PerformTransactionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
