import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { LoyaltyProviderModule } from './loyalty-provider/loyalty-providers/loyalty-provider.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoyaltyProviderModule,
    CustomerModule,
    CustomerRoutingModule,
    AppRoutingModule,
    RouterModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
