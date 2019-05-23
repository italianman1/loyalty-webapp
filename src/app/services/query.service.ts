import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User, redeemTokens, LoyaltyToken } from '../models/loyaltynetwork';
import { Type } from '@angular/compiler';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private headers: Headers;
  private actionUrl: string;

  constructor(private http: Http) {
    this.actionUrl = 'http://localhost:3000/api/queries/';
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  selectAllRedeemedTokenTransactions(customerId: string, providerId: string): Observable<redeemTokens[]> {
    return this.http.get(`${this.actionUrl}` + 'selectAllRedeemedTokenTransactions?customer_Id=' + customerId +
    '&provider_Id=' + providerId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectAllTransactions() {
    return this.http.get(`${this.actionUrl}` + 'selectAllTransactions')
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectAllEarnTokenTransactionsByCustomer(customerId: string): Observable<redeemTokens[]> {
    return this.http.get(`${this.actionUrl}` + 'selectAllEarnTokenTransactionsByCustomer?customer=' + customerId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectAllTokensFromProvider(ownerId: string, issuerId: string): Observable<LoyaltyToken[]> {
    return this.http.get(`${this.actionUrl}` + `selectAllTokensFromProvider?owner_id=${ownerId}&issuer_id=${issuerId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectEarnTokensTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectEarnTokensTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectRedeemTokensTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectRedeemTokensTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectIssueTokensTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectIssueTokensTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectTradeTokensTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectTradeTokensTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectJoinProgramTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectJoinProgramTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectExitProgramTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectExitProgramTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  selectRegisterProgramTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectRegisterProgramTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }


  selectDeclineProgramTransaction(transactionId: string) {
    return this.http.get(`${this.actionUrl}` + `selectDeclineProgramTransaction?id=${transactionId}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<string> {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
}

  private extractData(res: Response): any {
    return res.json();
}
}
