import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyProvidersComponent } from './loyalty-providers/loyalty-providers.component';
import { AddLoyaltyProviderComponent } from './add-loyalty-provider/add-loyalty-provider.component';
import { EditLoyaltyProviderComponent } from './edit-loyalty-provider/edit-loyalty-provider.component';
import { RegistrationOverviewComponent } from './registration-overview/registration-overview.component';
import { PartnerOverviewComponent } from './partner-overview/partner-overview.component';
import { ChangeConversionrateComponent } from './change-conversionrate/change-conversionrate.component';

const routes: Routes = [
  { path: 'loyalty-provider', component: LoyaltyProvidersComponent },
  { path: 'loyalty-provider/add', component: AddLoyaltyProviderComponent},
  { path: 'loyalty-provider/:providerId/edit', component: EditLoyaltyProviderComponent},
  { path: 'loyalty-provider/registrations', component: RegistrationOverviewComponent},
  { path: 'loyalty-provider/partner-overview', component: PartnerOverviewComponent},
  { path: 'loyalty-provider/change-conversionrate', component: ChangeConversionrateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyProviderRoutingModule { }
