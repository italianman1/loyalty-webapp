import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Type } from '@angular/compiler';
import { User, redeemTokens, LoyaltyToken } from '../models/loyaltynetwork';
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

  selectAllTokensFromProvider(ownerId: string, issuerId: string): Observable<LoyaltyToken[]> {
    return this.http.get(`${this.actionUrl}` + `selectAllTokensFromProvider?owner_id=${ownerId}&issuer_id=${issuerId}`)
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
