import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnerRoutingModule } from './loyalty-partner-routing.module';
import { RegisterProgramComponent } from './register-program/register-program.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RegisterProgramComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartnerRoutingModule,
    RouterModule,
  ]
})
export class PartnerModule { }
