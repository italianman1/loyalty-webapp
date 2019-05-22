import { Component, OnInit } from '@angular/core';
import { LoyaltyproviderService } from 'src/app/services/loyaltyprovider.service';
import { LoyaltyProvider, Customer } from 'src/app/models/loyaltynetwork';
import { CustomerService } from 'src/app/services/customer.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-join-program',
  templateUrl: './join-program.component.html',
  styleUrls: ['./join-program.component.css']
})
export class JoinProgramComponent implements OnInit {
  private providers: LoyaltyProvider[] = [];
  private selectedProviderId;
  private customerToAdd;
  private addTransaction;

  constructor(private providerService: LoyaltyproviderService, private customerService: CustomerService, private router: Router,
              private transactionService: TransactionService, private sessionService: SessionService) {
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
    this.customerService.addCustomer(this.customerToAdd)
    .toPromise()
    .then(() => {
      this.providers.forEach(provider => {
        if (provider.userId === this.selectedProviderId) {
          this.addTransaction = {
            $class: 'loyaltynetwork.joinProgram',
            programOwner: 'resource:loyaltynetwork.LoyaltyProvider#' + encodeURI(this.selectedProviderId),
            joiner: 'resource:loyaltynetwork.Customer#' + encodeURI(this.customerToAdd.userId)
          };

          this.transactionService.joinProgram(this.addTransaction)
          .toPromise()
          .then(() => {
            this.sessionService.setSignedInUser(this.customerToAdd.userId, this.customerToAdd.role);
            this.router.navigateByUrl('/home');
          });
        }
      });
    });
  }

  goBack() {
    this.router.navigateByUrl('/customer/program-overview');
  }
}
