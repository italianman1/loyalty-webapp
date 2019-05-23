import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterProgramComponent } from './register-program/register-program.component';

const routes: Routes = [
  { path: 'partner/join-program', component: RegisterProgramComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
