import { Component, OnInit } from '@angular/core';
import { Type } from '@angular/compiler';
import { Observable } from 'rxjs';
import { LoyaltyProvider, Customer } from 'src/app/models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-loyalty-program-overview',
  templateUrl: './loyalty-program-overview.component.html',
  styleUrls: ['./loyalty-program-overview.component.css']
})
export class LoyaltyProgramOverviewComponent implements OnInit {
  public allProviders: Observable<LoyaltyProvider[]>;
  private signedInCustomer;
  public providersToJoin: LoyaltyProvider[] = [];
  private joinTransaction;
  private exitTransaction;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private customerService: CustomerService, private router: Router,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.getCustomer();
    this.getProviders();
  }

  getProviders() {
    this.allProviders = this.loyaltyProviderService.getAllProviders();
  }

  getCustomer() {
    this.customerService.getCustomer('Henk1').subscribe(customer => {
      this.signedInCustomer = customer;
    });
  }

  checkIfJoined(loyaltyProvider: LoyaltyProvider): boolean {
    let hasJoined = false;
    this.signedInCustomer.providers.forEach(provider => {
        const userId: string = provider.split('#')[1];
        const userId2: string = loyaltyProvider.userId;
        if (userId === userId2) {
          hasJoined = true;
        }
      });

    return hasJoined;
  }

  joinProvider(loyaltyProvider: LoyaltyProvider) {
    this.joinTransaction = {
      $class: 'loyaltynetwork.joinProgram',
      programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + loyaltyProvider.userId,
      joiner: 'resource:loyaltynetwork.Customer#' + this.signedInCustomer.userId,
    };

    this.transactionService.joinProgram(this.joinTransaction)
    .toPromise()
    .then(() => {
        this.router.navigateByUrl('home');
      });
  }

  deleteProvider(loyaltyProvider: LoyaltyProvider) {
    this.exitTransaction = {
      $class: 'loyaltynetwork.exitProgram',
      programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + loyaltyProvider.userId,
      exiter: 'resource:loyaltynetwork.Customer#' + this.signedInCustomer.userId,
    };

    this.transactionService.exitProgram(this.exitTransaction)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('home');
      });
  }

}
