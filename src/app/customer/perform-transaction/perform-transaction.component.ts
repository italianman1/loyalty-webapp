import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider, User } from 'src/app/models/loyaltynetwork';
import { CustomerService } from 'src/app/services/customer.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { PartnerService } from 'src/app/services/partner.service';

@Component({
  selector: 'app-perform-transaction',
  templateUrl: './perform-transaction.component.html',
  styleUrls: ['./perform-transaction.component.css']
})
export class PerformTransactionComponent implements OnInit {
  private retailers: any[] = [];
  private redeemTransaction;
  private earnTransaction;
  private issueTransaction;
  private amountOfGroceries;
  private selectedRetailerId;
  private signedInCustomer;
  private offerTransaction;
  private amountOfDiscount;
  private errorMessage = '';
  private clicked = false;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private sessionService: SessionService,
              private transactionService: TransactionService, private router: Router) {
  }

  ngOnInit() {
   this.getProvidersAndPartners();
   this.getUser();
   console.log(this.retailers);
  }

  getProvidersAndPartners() {
    this.loyaltyProviderService.getAllProviders('{"include": "resolve"}').subscribe(providers => {
      providers.forEach(provider => {
        this.retailers.push(provider);
        provider.partners.forEach(partner => {
          this.retailers.push(partner);
        });
      });
    });
  }

  getUser() {
    this.sessionService.getSignedInUser("minimal")
    .then(user => {
      this.signedInCustomer = user;
    });
  }

  goBack() {
    this.router.navigateByUrl('home');
  }

  onSubmit() {
    this.clicked = true;
    let selectedRetailer;

    this.retailers.forEach(retailer => {
      if (retailer.userId == this.selectedRetailerId) {
        selectedRetailer = retailer;
      }
    });

    if ((this.amountOfGroceries - this.amountOfDiscount) > 0 && this.amountOfDiscount > 0) {
      this.issueTokens(selectedRetailer)
      .then(() => {
        this.redeemTokens(selectedRetailer)
        .then(() => {
          this.earnTokens(selectedRetailer);
          this.router.navigateByUrl('/transaction-overview');
        }).catch(err => {
          this.showError(err);
        });
      }).catch(err => {
        this.showError(err);
      });
    }

    if ((this.amountOfGroceries - this.amountOfDiscount) > 0 && this.amountOfDiscount == 0) {
        this.issueTokens(selectedRetailer)
        .then(() => {
          this.earnTokens(selectedRetailer);
          this.router.navigateByUrl('/transaction-overview');
        }).catch(err => {
          this.showError(err);
        });
      }

    if ((this.amountOfGroceries - this.amountOfDiscount) <= 0 && this.amountOfDiscount > 0) {
        this.redeemTokens(selectedRetailer)
        .then(() => {
          this.router.navigateByUrl('/transaction-overview');
        }).catch(err => {
          this.showError(err);
        });
      }
  }

  issueTokens(retailer: any): Promise<any> {
    if(retailer.role == 'Partner') {
      this.issueTransaction = {
        $class: 'loyaltynetwork.issueTokens',
        issuedTokens: (this.amountOfGroceries - this.amountOfDiscount) * retailer.provider.conversionRate,
        issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + retailer.provider.userId,
        amountOfEuros: (this.amountOfGroceries - this.amountOfDiscount) / retailer.provider.conversionRate,
      };
    }

    else { 
      this.issueTransaction = {
        $class: 'loyaltynetwork.issueTokens',
        issuedTokens: (this.amountOfGroceries - this.amountOfDiscount) * retailer.conversionRate,
        issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + retailer.userId,
        amountOfEuros: (this.amountOfGroceries - this.amountOfDiscount) / retailer.conversionRate,
      };
    }

    console.log(this.issueTokens);

    return this.transactionService.issueTokens(this.issueTransaction).toPromise();
  }

  redeemTokens(retailer: any): Promise<any> {
    if(retailer.role == "Partner") {
      this.redeemTransaction = {
        $class: 'loyaltynetwork.redeemTokens',
        accepter: 'resource:loyaltynetwork.LoyaltyPartner#' + encodeURI(retailer.userId),
        redeemer: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
        amountOfDiscount: parseInt(this.amountOfDiscount, 10)
      };
    }

    if(retailer.role == "Provider"){
      this.redeemTransaction = {
        $class: 'loyaltynetwork.redeemTokens',
        accepter: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(retailer.userId),
        redeemer: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
        amountOfDiscount: parseInt(this.amountOfDiscount, 10)
      };
    }

    console.log(this.redeemTransaction);

    return this.transactionService.redeemTokens(this.redeemTransaction).toPromise();
  }

  earnTokens(retailer: any): Promise<any> {
    if(retailer.role == "Partner") {
      this.earnTransaction = {
        $class: 'loyaltynetwork.earnTokens',
        earner: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
        issuer: 'resource:loyaltynetwork.LoyaltyPartner#' + encodeURI(retailer.userId),
        amountOfEuros: (this.amountOfGroceries - this.amountOfDiscount)
      };
    }

    if(retailer.role == "Provider") {
      this.earnTransaction = {
        $class: 'loyaltynetwork.earnTokens',
        earner: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
        issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(retailer.userId),
        amountOfEuros: (this.amountOfGroceries - this.amountOfDiscount)
      };
    }
    console.log(this.earnTransaction);

    return this.transactionService.earnTokens(this.earnTransaction).toPromise();
  }

  // performOffer1() {
  //   let provider;
  //   this.loyaltyProviderService.getProvider('Action0').subscribe(result => {
  //     provider = result;
  //   });

  //   this.offerTransaction = {
  //     $class: 'loyaltynetwork.redeemTokens',
  //     redeemedTokens: 10,
  //     accepter: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(provider.userId),
  //     redeemer: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
  //     amountOfEuros: 10
  //   };
  // }

  // performOffer2() {
  //     let provider;
  //     this.loyaltyProviderService.getProvider('Praxis0').subscribe(result => {
  //       provider = result;
  //     });

  //     this.offerTransaction = {
  //       $class: 'loyaltynetwork.redeemTokens',
  //       redeemedTokens: 50,
  //       accepter: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(provider.userId),
  //       redeemer: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
  //       amountOfEuros: 100
  //   }
  // }

  // performOffer3() {
  //   let provider;
  //   this.loyaltyProviderService.getProvider('Praxis0').subscribe(result => {
  //     provider = result;
  //   });

  //   this.offerTransaction = {
  //     $class: 'loyaltynetwork.earnTokens',
  //     earner: 'resource:loyaltynetwork.Customer#' + encodeURI(this.signedInCustomer.userId),
  //     earnedTokens: 100,
  //     issuer: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(provider.userId),
  //     amountOfEuros: 10
  // }
// }

  setDiscount(discount) {
    this.amountOfDiscount = discount;
  }

  showError(errorMessage) {
    this.errorMessage = errorMessage;
    this.router.navigateByUrl('/transaction-overview');
  }

}
