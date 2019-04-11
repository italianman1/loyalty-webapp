import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoyaltyProvidersComponent } from './loyalty-providers.component';
import { AddLoyaltyProviderComponent } from '../add-loyalty-provider/add-loyalty-provider.component';
import { EditLoyaltyProviderComponent } from '../edit-loyalty-provider/edit-loyalty-provider.component';

const routes: Routes = [
  { path: 'loyalty-provider', component: LoyaltyProvidersComponent },
  { path: 'loyalty-provider/add', component: AddLoyaltyProviderComponent},
  { path: 'loyalty-provider/:providerId/edit', component: EditLoyaltyProviderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyProviderRoutingModule { }
