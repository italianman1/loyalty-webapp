import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Type } from '@angular/compiler';
import { HistorianRecord } from '../models/hyperledger.composer';
import { QueryService } from '../services/query.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  private historian: HistorianRecord;
  private transaction;
  private transactionType;
  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.getTransaction();
    this.transactionType = this.transaction.$class.split('.')[1];
  }

  getTransaction() {
    this.transaction = this.sessionService.getSelectedTransaction();
  }

  goBack() {
    this.router.navigateByUrl('transaction-overview');
  }

}
