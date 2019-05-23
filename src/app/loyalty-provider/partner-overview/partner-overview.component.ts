import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider, LoyaltyPartner } from 'src/app/models/loyaltynetwork';
import { Observable, of } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-partner-overview',
  templateUrl: './partner-overview.component.html',
  styleUrls: ['./partner-overview.component.css']
})
export class PartnerOverviewComponent implements OnInit {
  private signedInProvider;
  private allPartners: Observable<LoyaltyPartner[]>;
  private exitProgramTransaction;

  constructor(private loyaltyProviderService: LoyaltyproviderService, private transactionService: TransactionService,
              private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.sessionService.getSignedInUser()
    .then(user => {
      this.signedInProvider = user;
      this.allPartners = of(this.signedInProvider.partners);
    });
  }

  reloadPartners() {
    this.loyaltyProviderService.getProvider(this.signedInProvider.userId, '{"include": "resolve"}')
    .subscribe(provider => {
      this.allPartners = of(provider.partners);
    });
  }

  deletePartner(partner) {
    this.exitProgramTransaction = {
      $class: 'loyaltynetwork.exitProgram',
      programOwner: 'loyaltynetwork.LoyaltyProvider#' + encodeURI(this.signedInProvider.userId),
      exiter: 'loyaltynetwork.LoyaltyPartner#' + encodeURI(partner.userId),
    };

    this.transactionService.exitProgram(this.exitProgramTransaction)
    .toPromise()
    .then(() => {
      this.reloadPartners();
    });
  }

  goBack() {
    this.router.navigateByUrl('loyalty-provider');
  }

}
