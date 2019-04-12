import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { LoyaltyProvidersComponent } from './loyalty-provider/loyalty-providers/loyalty-providers.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { LoyaltyProviderModule } from './loyalty-provider/loyalty-providers/loyalty-provider.module';
import { AddLoyaltyProviderComponent } from './loyalty-provider/add-loyalty-provider/add-loyalty-provider.component';
import { FormsModule } from '@angular/forms';
import { EditLoyaltyProviderComponent } from './loyalty-provider/edit-loyalty-provider/edit-loyalty-provider.component';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoyaltyProvidersComponent,
    PagenotfoundComponent,
    HomeComponent,
    AddLoyaltyProviderComponent,
    EditLoyaltyProviderComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoyaltyProviderModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CustomerRoutingModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
