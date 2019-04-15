import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinProgramComponent } from './join-program/join-program.component';
import { LoyaltyProgramOverviewComponent } from './loyalty-program-overview/loyalty-program-overview.component';

const routes: Routes = [
  { path: 'customer/join-program', component: JoinProgramComponent },
  { path: 'customer/program-overview', component: LoyaltyProgramOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
