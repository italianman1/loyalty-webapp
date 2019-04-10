import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { User, LoyaltyProvider } from '../../models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';

@Component({
  selector: 'app-loyalty-providers',
  templateUrl: './loyalty-providers.component.html',
  styleUrls: ['./loyalty-providers.component.css']
})
export class LoyaltyProvidersComponent implements OnInit {
  private errorMessage;
  allProviders: Array<LoyaltyProvider> = [];

  constructor(private loyaltyProviderService: LoyaltyproviderService) {
    this.getProviders();
  }

  ngOnInit() {
  }

  getProviders(){
    this.loyaltyProviderService.getAllProviders().subscribe(providers => {
      this.allProviders = providers;
    });
  }

 


}
