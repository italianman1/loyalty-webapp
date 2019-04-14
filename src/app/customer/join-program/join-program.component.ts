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
  private providers: LoyaltyProvider[];
  private selectedProvider: LoyaltyProvider;
  private customerToAdd: Customer;

  constructor(private providerService: LoyaltyproviderService, private customerService: CustomerService, private router: Router) { }

  ngOnInit() {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  onSubmit() {
    this.customerToAdd.userId =  this.customerToAdd.lastName + Math.floor(Math.random() * 100).toString();
    this.customerToAdd.providers.push(this.selectedProvider);
    this.setCustomerValues();
    this.customerService.addCustomer(this.customerToAdd)
    .toPromise()
    .then(() => {
      this.selectedProvider.customers.push(this.customerToAdd);
      this.providerService.updateProvider(this.selectedProvider)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('/customers');
      });
    });
  }

  setCustomerValues(){
    this.customerToAdd.role = 'Customer';
    this.customerToAdd.tokens = [];
  }

}
