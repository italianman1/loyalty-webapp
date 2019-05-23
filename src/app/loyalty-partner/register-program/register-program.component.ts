import { Component, OnInit } from '@angular/core';
import { LoyaltyProvider } from 'src/app/models/loyaltynetwork';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { PartnerService } from 'src/app/services/partner.service';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-register-program',
  templateUrl: './register-program.component.html',
  styleUrls: ['./register-program.component.css']
})
export class RegisterProgramComponent implements OnInit {

private providers: LoyaltyProvider[] = [];
private selectedProviderId;
private partnerToAdd;
private registerTransaction;

constructor(private providerService: LoyaltyproviderService, private partnerService: PartnerService, private router: Router,
            private transactionService: TransactionService) {
    this.partnerToAdd = {
        $class: 'loyaltynetwork.LoyaltyPartner',
        companyName: '',
        userId: '',
        email: '',
        role: 'Partner',
        tokens: []
      };
}

  ngOnInit() {
    this.providerService.getAllProviders().subscribe(providers => {
      this.providers = providers;
    });

  }

  onSubmit() {
    this.partnerToAdd.userId = this.partnerToAdd.companyName + Math.floor(Math.random() * 100).toString();
    this.partnerService.addPartner(this.partnerToAdd)
      .toPromise()
      .then(() => {
      this.registerTransaction = {
        $class: 'loyaltynetwork.registerForAProgram',
        programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(this.selectedProviderId),
        register: 'resource:loyaltynetwork.LoyaltyPartner#' + encodeURI(this.partnerToAdd.userId)
      };

      this.transactionService.registerForAProgram(this.registerTransaction)
      .toPromise()
      .then(() => {
        this.router.navigateByUrl('/partner/program-overview');
      });
    });
  }

  goBack() {
    this.router.navigateByUrl('/partner/program-overview');
  }
}
