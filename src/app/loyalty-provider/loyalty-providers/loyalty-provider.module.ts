import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyProviderRoutingModule } from './loyalty-provider-routing.module';
import { AddLoyaltyProviderComponent } from '../add-loyalty-provider/add-loyalty-provider.component';
import { EditLoyaltyProviderComponent } from '../edit-loyalty-provider/edit-loyalty-provider.component';
import { LoyaltyProvidersComponent } from './loyalty-providers.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddLoyaltyProviderComponent,
    EditLoyaltyProviderComponent,
    LoyaltyProvidersComponent,
  ],
  imports: [
    CommonModule,
    LoyaltyProviderRoutingModule,
    FormsModule
  ]
})
export class LoyaltyProviderModule { }
