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
import { FormsModule }   from '@angular/forms';
import { EditLoyaltyProviderComponent } from './loyalty-provider-components/edit-loyalty-provider/edit-loyalty-provider.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoyaltyProvidersComponent,
    PagenotfoundComponent,
    HomeComponent,
    AddLoyaltyProviderComponent,
    EditLoyaltyProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LoyaltyProviderModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
