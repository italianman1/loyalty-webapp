import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { joinProgram, earnTokens } from '../models/loyaltynetwork';
import { HttpService } from './http.service';
import { Transaction } from '../models/hyperledger.composer';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpService: HttpService<Transaction>) { }
  
  joinProgram(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('joinProgram', instance);
  }

  registerForAProgram(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('registerForAProgram', instance);
  }

  declineForAProgram(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('declineForAProgram', instance);
  }

  exitProgram(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('exitProgram', instance);
  }

  earnTokens(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('earnTokens', instance);
  }

  getAllEarnTokens(filter: string): Observable<any[]> {
    return this.httpService.getAll('earnTokens', filter);
  }

  getAllRedeemTokens(filter: string): Observable<any[]> {
    return this.httpService.getAll('redeemTokens', filter);
  }

  getAllTradeTokens(filter: string): Observable<any[]> {
    return this.httpService.getAll('tradeTokens', filter);
  }

  getAllIssueTokens(filter: string): Observable<any[]> {
    return this.httpService.getAll('issueTokens', filter);
  }

  redeemTokens(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('redeemTokens', instance);
  }

  issueTokens(instance: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('issueTokens', instance);
  }

  returnTransactionsByUser(instance: Transaction, options?: Transaction): Observable<Transaction> {
    return this.httpService.addSingleInstance('returnTransactionsByUser', instance, options);
  }
}
