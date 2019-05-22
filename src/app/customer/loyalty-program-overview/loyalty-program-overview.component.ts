import { Component, OnInit } from '@angular/core';
import { Type } from '@angular/compiler';
import { Observable } from 'rxjs';
import { LoyaltyProvider, Customer } from 'src/app/models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-loyalty-program-overview',
  templateUrl: './loyalty-program-overview.component.html',
  styleUrls: ['./loyalty-program-overview.component.css']
})
export class LoyaltyProgramOverviewComponent implements OnInit {
  public allProviders: Observable<LoyaltyProvider[]>;
  private signedInCustomer;
  private joinTransaction;
  private exitTransaction;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private sessionService: SessionService, private router: Router,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.getUser();
  }

  getProviders() {
    this.allProviders = this.loyaltyProviderService.getAllProviders();
  }

  getUser() {
   this.sessionService.getSignedInUser()
    .then(user => {
      this.signedInCustomer = user;
      this.getProviders();
    });
  }

  checkIfJoined(loyaltyProvider: LoyaltyProvider): boolean {
    let hasJoined = false;
    this.signedInCustomer.providers.forEach(provider => {
        if (loyaltyProvider.userId === provider.userId) {
          hasJoined = true;
        }
      });

    return hasJoined;
  }

  joinProvider(loyaltyProvider: LoyaltyProvider) {
    this.joinTransaction = {
      $class: 'loyaltynetwork.joinProgram',
      programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(loyaltyProvider.userId),
      joiner: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
    };

    this.transactionService.joinProgram(this.joinTransaction)
    .toPromise()
    .then(() => {
        this.ngOnInit();
      });
  }

  deleteProvider(loyaltyProvider: LoyaltyProvider) {
    this.exitTransaction = {
      $class: 'loyaltynetwork.exitProgram',
      programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(loyaltyProvider.userId),
      exiter: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
    };

    this.transactionService.exitProgram(this.exitTransaction)
      .toPromise()
      .then(() => {
        this.ngOnInit();
      });
  }

}
