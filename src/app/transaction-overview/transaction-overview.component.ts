import { Component, OnInit, Type } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { TransactionService } from '../services/transaction.service';
import { QueryService } from '../services/query.service';
import { Observable } from 'rxjs';
import { LoyaltyproviderService } from '../services/loyaltyprovider.service';
import { Router } from '@angular/router';
import { Transaction } from '../models/hyperledger.composer';
import { earnTokens } from '../models/loyaltynetwork';
import { PartnerService } from '../services/partner.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-transaction-overview',
  templateUrl: './transaction-overview.component.html',
  styleUrls: ['./transaction-overview.component.css']
})
export class TransactionOverviewComponent implements OnInit {
  private signedInUser;
  public allTransactions: Array<Transaction> = [];

  constructor(private sessionService: SessionService, private router: Router,
              private transactionService: TransactionService) { }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.sessionService.getSignedInUser()
    .then((user) => {
      this.signedInUser = user;
      this.getTransactions();
    });
  }

  detailTransaction(transaction) {
    this.sessionService.setSelectedTransaction(transaction);
    this.router.navigateByUrl('transaction-detail/' + transaction.transactionId);
  }

  getTransactions() {
    if(this.signedInUser.role == 'Customer'){
      this.transactionService.getAllEarnTokens('{"include": "resolve"}')
      .toPromise()
      .then(transactions => {
        transactions.forEach(transaction => {
          if(transaction.earner.userId == this.signedInUser.userId) {
            this.allTransactions.push(transaction);
          }
        });
        this.transactionService.getAllRedeemTokens('{"include": "resolve"}')
        .toPromise()
        .then(transactions => {
          transactions.forEach(transaction =>{
            if(transaction.redeemer.userId == this.signedInUser.userId) {
              this.allTransactions.push(transaction);
            }
          });
          this.transactionService.getAllTradeTokens('{"include": "resolve"}')
          .toPromise()
          .then(transactions => {
            transactions.forEach(transaction =>{
              if(transaction.trader.userId == this.signedInUser.userId) {
                this.allTransactions.push(transaction);
              }
            });
          });
        });
      });
    }

    if (this.signedInUser.role == "Provider") {
      this.transactionService.getAllEarnTokens('{"include": "resolve"}')
      .toPromise()
      .then(transactions => {
        transactions.forEach(transaction => {
          this.allTransactions.push(transaction);
        });
        this.transactionService.getAllRedeemTokens('{"include": "resolve"}')
        .toPromise()
        .then(transactions => {
          transactions.forEach(transaction =>{
            this.allTransactions.push(transaction);
          });
          this.transactionService.getAllTradeTokens('{"include": "resolve"}')
          .toPromise()
          .then(transactions => {
            transactions.forEach(transaction => {
              this.allTransactions.push(transaction);
            });
            this.transactionService.getAllIssueTokens('{"include": "resolve"}')
            .toPromise()
            .then(transactions => {
              console.log(transactions);
              transactions.forEach(transaction => {
                if(transaction.issuer.userId == this.signedInUser.userId){
                  this.allTransactions.push(transaction);
                }
              });
          });
        });
      });
    });
  }

    if (this.signedInUser.role == "SolutionProvider") {
    this.transactionService.getAllEarnTokens('{"include": "resolve"}')
    .toPromise()
    .then(transactions => {
      transactions.forEach(transaction => {
        this.allTransactions.push(transaction);
      });
      this.transactionService.getAllRedeemTokens('{"include": "resolve"}')
      .toPromise()
      .then(transactions => {
        transactions.forEach(transaction =>{
          this.allTransactions.push(transaction);
        });
        this.transactionService.getAllTradeTokens('{"include": "resolve"}')
        .toPromise()
        .then(transactions => {
          transactions.forEach(transaction => {
            this.allTransactions.push(transaction);
          });
          this.transactionService.getAllIssueTokens('{"include": "resolve"}')
          .toPromise()
          .then(transactions => {
            console.log(transactions);
            transactions.forEach(transaction => {
              this.allTransactions.push(transaction);
            });
        });
      });
    });
  });
}

    if (this.signedInUser.role == "Partner"){
      this.transactionService.getAllEarnTokens('{"include": "resolve"}')
      .toPromise()
      .then(transactions => {
        transactions.forEach(transaction => {
          if(transaction.issuer.userId == this.signedInUser.userId){
            this.allTransactions.push(transaction);
          }
        });
        this.transactionService.getAllRedeemTokens('{"include": "resolve"}')
        .toPromise()
        .then(transactions => {
          transactions.forEach(transaction =>{
            if(transaction.accepter.userId == this.signedInUser.userId){
              this.allTransactions.push(transaction);
            }
          });
        });
      });
    }
    console.log(this.allTransactions);
  }

  goBack() {
    this.router.navigateByUrl('home');
  }

}
