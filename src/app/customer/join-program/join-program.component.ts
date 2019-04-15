import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider, Customer } from 'src/app/models/loyaltynetwork';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-program',
  templateUrl: './join-program.component.html',
  styleUrls: ['./join-program.component.css']
})
export class JoinProgramComponent implements OnInit {
  private providers: LoyaltyProvider[] = [];
  private selectedProviderId;
  private customerToAdd;

  constructor(private providerService: LoyaltyproviderService, private customerService: CustomerService, private router: Router) {
    this.customerToAdd = {
      $class: 'loyaltynetwork.Customer',
      firstName: '',
      lastName: '',
      providers: [],
      userId: '',
      email: '',
      role: 'Customer',
      tokens: []
    };
  }

  ngOnInit() {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });

  }

  onSubmit() {
    this.customerToAdd.userId =  this.customerToAdd.lastName + Math.floor(Math.random() * 100).toString();
    this.customerToAdd.providers.push('resource:loyaltynetwork.LoyaltyProvider#' + this.selectedProviderId);
    this.customerService.addCustomer(this.customerToAdd)
    .toPromise()
    .then(() => {
      this.providers.forEach(provider => {
        if (provider.userId === this.selectedProviderId) {
          provider.customers.push('resource:loyaltynetwork.Customer#' + this.customerToAdd.userId);
          this.providerService.updateProvider(provider)
          .toPromise()
          .then(() => {
            this.router.navigateByUrl('/customers');
          });
        }
      });
    });
  }
}
