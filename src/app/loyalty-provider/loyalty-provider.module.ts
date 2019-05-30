import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyProviderRoutingModule } from './loyalty-provider-routing.module';
import { AddLoyaltyProviderComponent } from './add-loyalty-provider/add-loyalty-provider.component';
import { EditLoyaltyProviderComponent } from './edit-loyalty-provider/edit-loyalty-provider.component';
import { LoyaltyProvidersComponent } from './loyalty-providers/loyalty-providers.component';
import { FormsModule } from '@angular/forms';
import { RegistrationOverviewComponent } from './registration-overview/registration-overview.component';
import { PartnerOverviewComponent } from './partner-overview/partner-overview.component';
import { ChangeConversionrateComponent } from './change-conversionrate/change-conversionrate.component';

@NgModule({
  declarations: [
    AddLoyaltyProviderComponent,
    EditLoyaltyProviderComponent,
    LoyaltyProvidersComponent,
    RegistrationOverviewComponent,
    PartnerOverviewComponent,
    ChangeConversionrateComponent
  ],
  imports: [
    CommonModule,
    LoyaltyProviderRoutingModule,
    FormsModule
  ]
})
export class LoyaltyProviderModule { }
