import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoyaltyProvider, Customer } from 'src/app/models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-loyalty-program-overview',
  templateUrl: './loyalty-program-overview.component.html',
  styleUrls: ['./loyalty-program-overview.component.css']
})
export class LoyaltyProgramOverviewComponent implements OnInit {
  private allProviders: LoyaltyProvider[];
  private signedInCustomer: Customer;
  private providersToJoin: LoyaltyProvider[];

  constructor(private loyaltyProviderService: LoyaltyproviderService, private customerProviderService: CustomerService) {
    this.getCustomer();
    //this.getProvidersToJoin();
  }

  ngOnInit() { }

  getProviders() {
    this.loyaltyProviderService.getAllProviders().subscribe(providers => {
      this.allProviders = providers;
      console.log(this.allProviders);
    });
  }

  getCustomer() {
    this.customerProviderService.getCustomer('Sentjens50')
    .toPromise()
    .then(customer => {
      this.getProviders();
    });
  }

  getProvidersToJoin() {
    this.signedInCustomer.providers.forEach(provider1 => {
      this.allProviders.forEach(provider2 => {
        console.log(provider2);
        if (provider1.userId !== provider2.userId) {
          this.providersToJoin.push(provider1);
       }
      });
    });

  }




}
