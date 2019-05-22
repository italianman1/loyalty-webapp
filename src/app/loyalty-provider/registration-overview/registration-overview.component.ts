import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { Observable } from 'rxjs';
import { LoyaltyProvider } from 'src/app/models/loyaltynetwork';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-registration-overview',
  templateUrl: './registration-overview.component.html',
  styleUrls: ['./registration-overview.component.css']
})
export class RegistrationOverviewComponent implements OnInit {
  private allRegistrations;
  private signedInProvider: LoyaltyProvider;
  private joinTransaction;
  private declineTransaction;


  constructor(private loyaltyProviderService: LoyaltyproviderService, private router: Router, 
              private transactionService: TransactionService, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getSignedInUser()
    .then(user => {
      this.signedInProvider = user;
      console.log(this.signedInProvider);
      this.allRegistrations = this.signedInProvider.registrations;
    });
  }

  reloadRegistrations() {
    this.loyaltyProviderService.getProvider(this.signedInProvider.userId, '{"include": "resolve"}').subscribe(provider => {
      this.allRegistrations = provider.registrations;
    });
  }

  acceptPartner(loyaltypartner) {
    this.joinTransaction = {
      $class: 'loyaltynetwork.joinProgram',
      joiner: 'loyaltynetwork.LoyaltyPartner#' + encodeURI(loyaltypartner.userId),
      programOwner: 'loyaltynetwork.LoyaltyProvider#' + encodeURI(this.signedInProvider.userId),
    };
    this.transactionService.joinProgram(this.joinTransaction)
    .toPromise()
    .then(() => {
      this.reloadRegistrations();
    });
  }

  declinePartner(loyaltypartner) {
    this.declineTransaction = {
      $class: 'loyaltynetwork.declineForAProgram',
      declinedPartner: 'loyaltynetwork.LoyaltyPartner#' + encodeURI(loyaltypartner.userId),
      programOwner: 'loyaltynetwork.LoyaltyProvider#' + encodeURI(this.signedInProvider.userId),
    };

    this.transactionService.declineForAProgram(this.declineTransaction)
    .toPromise()
    .then(() => {
      this.reloadRegistrations();
    });
  }

  goBack() {
    this.router.navigateByUrl('loyalty-provider');
  }

}
