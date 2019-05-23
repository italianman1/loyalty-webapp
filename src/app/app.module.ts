import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { LoyaltyProviderModule } from './loyalty-provider/loyalty-provider.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { CustomerModule } from './customer/customer.module';
import { TransactionOverviewComponent } from './transaction-overview/transaction-overview.component';
import { PartnerRoutingModule } from './loyalty-partner/loyalty-partner-routing.module';
import { PartnerModule } from './loyalty-partner/loyalty-partner.module';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
    TransactionOverviewComponent,
    TransactionDetailComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoyaltyProviderModule,
    CustomerModule,
    CustomerRoutingModule,
    PartnerModule,
    PartnerRoutingModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
