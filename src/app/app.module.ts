import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { LoyaltyProvidersComponent } from './loyalty-provider-components/loyalty-providers/loyalty-providers.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { LoyaltyProviderModule } from './loyalty-provider-components/loyalty-providers/loyalty-provider.module';
import { AddLoyaltyProviderComponent } from './loyalty-provider-components/add-loyalty-provider/add-loyalty-provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoyaltyProvidersComponent,
    PagenotfoundComponent,
    HomeComponent,
    AddLoyaltyProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoyaltyProviderModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
