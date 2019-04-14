import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinProgramComponent } from './join-program/join-program.component';

const routes: Routes = [
  { path: 'customer/join-program', component: JoinProgramComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
