import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider, issueTokens } from 'src/app/models/loyaltynetwork';
import { CustomerService } from 'src/app/services/customer.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perform-transaction',
  templateUrl: './perform-transaction.component.html',
  styleUrls: ['./perform-transaction.component.css']
})
export class PerformTransactionComponent implements OnInit {
  providers: LoyaltyProvider[];
  private redeemTransaction;
  private earnTransaction;
  private issueTransaction;
  private amountOfGroceries;
  private selectedProviderId;
  private signedInCustomer;
  private tokensToBeRedeemed;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private customerService: CustomerService,
              private transactionService: TransactionService, private router: Router) {
  }

  ngOnInit() {
   this.getProviders();
   this.getCustomer();
  }

  getProviders() {
    this.loyaltyProviderService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });
  }

  getCustomer() {
    this.customerService.getCustomer('Henk1').subscribe(customer => {
      this.signedInCustomer = customer;
    });
  }

  onSubmit() {
    let selectedProvider;
    this.providers.forEach(provider => {
      if (provider.userId == this.selectedProviderId) {
        selectedProvider = provider;
      }});

    if (this.amountOfGroceries > 0 && this.tokensToBeRedeemed > 0) {
      this.issueTokens(selectedProvider)
      .then(() => {
        this.redeemTokens(selectedProvider)
        .then(() => {
          this.earnTokens(selectedProvider);
          this.router.navigateByUrl('/home');
        });
      });
    }

    if (this.amountOfGroceries > 0 && this.tokensToBeRedeemed == 0) {
        this.issueTokens(selectedProvider)
        .then(() => {
          this.earnTokens(selectedProvider);
          this.router.navigateByUrl('/home');
        });
      }

    if (this.amountOfGroceries == 0 && this.tokensToBeRedeemed > 0) {
        this.redeemTokens(selectedProvider)
        .then(() => {
          this.router.navigateByUrl('/home');
        });
      }
  }

  issueTokens(provider: LoyaltyProvider): Promise<any> {
    this.issueTransaction = {
      $class: 'loyaltynetwork.issueTokens',
      issuedTokens: this.amountOfGroceries / provider.conversionRate,
      issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + provider.userId,
    };

    return this.transactionService.issueTokens(this.issueTransaction).toPromise();
  }

  redeemTokens(provider: LoyaltyProvider): Promise<any> {
    console.log(this.tokensToBeRedeemed);
    this.redeemTransaction = {
      $class: 'loyaltynetwork.redeemTokens',
      redeemedTokens: this.tokensToBeRedeemed,
      accepter: 'resource:loyaltynetwork.LoyaltyProvider#' + provider.userId,
      redeemer: 'resource:loyaltynetwork.Customer#' + this.signedInCustomer.userId,
    };

    return this.transactionService.redeemTokens(this.redeemTransaction).toPromise();
  }

  earnTokens(provider: LoyaltyProvider): Promise<any> {
    this.earnTransaction = {
      $class: 'loyaltynetwork.earnTokens',
      earner: 'resource:loyaltynetwork.Customer#' + this.signedInCustomer.userId,
      earnedTokens: this.amountOfGroceries / provider.conversionRate,
      issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + provider.userId,
    };

    return this.transactionService.earnTokens(this.earnTransaction).toPromise();
  }

}
